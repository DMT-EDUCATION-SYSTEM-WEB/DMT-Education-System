#!/bin/bash

# =================================================================
# Script to import all mock data using Docker exec
# =================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="dmt-sqlserver"
DB_SERVER="localhost"
DB_USER="sa"
DB_PASSWORD="Password123!"
DB_NAME="DMT_EDUCATION_SYSTEM"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Import Mock Data via Docker${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${RED}❌ Container '${CONTAINER_NAME}' is not running!${NC}"
    echo "Please start it with: docker start ${CONTAINER_NAME}"
    exit 1
fi

echo -e "${GREEN}✅ Container '${CONTAINER_NAME}' is running${NC}"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Function to run SQL script via docker exec
run_sql_script() {
    local script_file=$1
    local description=$2
    
    if [ ! -f "$script_file" ]; then
        echo -e "${RED}❌ Script not found: $script_file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Running: $description${NC}"
    echo -e "${BLUE}File: $script_file${NC}"
    
    # Try different sqlcmd paths
    local SQLCMD_PATH=""
    if docker exec ${CONTAINER_NAME} test -f /opt/mssql-tools18/bin/sqlcmd; then
        SQLCMD_PATH="/opt/mssql-tools18/bin/sqlcmd"
    elif docker exec ${CONTAINER_NAME} test -f /opt/mssql-tools/bin/sqlcmd; then
        SQLCMD_PATH="/opt/mssql-tools/bin/sqlcmd"
    elif docker exec ${CONTAINER_NAME} which sqlcmd > /dev/null 2>&1; then
        SQLCMD_PATH="sqlcmd"
    else
        # Use Python script as fallback
        echo -e "${YELLOW}⚠️  sqlcmd not found, using Python fallback${NC}"
        python3 << EOF
import pyodbc
import sys

try:
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        f'SERVER={DB_SERVER};'
        f'DATABASE={DB_NAME};'
        f'UID={DB_USER};'
        f'PWD={DB_PASSWORD};'
        'TrustServerCertificate=yes;'
    )
    cursor = conn.cursor()
    
    with open('${script_file}', 'r', encoding='utf-8') as f:
        sql = f.read()
        # Split by GO statements
        batches = sql.split('GO')
        for batch in batches:
            batch = batch.strip()
            if batch:
                try:
                    cursor.execute(batch)
                    conn.commit()
                except Exception as e:
                    print(f"Error: {e}")
    
    conn.close()
    print("✅ Script executed")
except Exception as e:
    print(f"❌ Connection error: {e}")
    sys.exit(1)
EOF
        return $?
    fi
    
    # Copy script to container and execute
    docker cp "$script_file" ${CONTAINER_NAME}:/tmp/script.sql > /dev/null 2>&1
    
    if docker exec ${CONTAINER_NAME} ${SQLCMD_PATH} -S ${DB_SERVER} -U ${DB_USER} -P "${DB_PASSWORD}" -d ${DB_NAME} -C -i /tmp/script.sql -W -b > /tmp/sql_output.log 2>&1; then
        echo -e "${GREEN}✅ $description completed${NC}"
        # Show any warnings
        if grep -i "warning\|error" /tmp/sql_output.log 2>/dev/null | grep -v "already exists" > /dev/null; then
            echo -e "${YELLOW}⚠️  Warnings/Errors:${NC}"
            grep -i "warning\|error" /tmp/sql_output.log | grep -v "already exists" | head -5
        fi
        echo ""
        return 0
    else
        echo -e "${RED}❌ $description failed${NC}"
        echo -e "${YELLOW}Last 10 lines of output:${NC}"
        tail -10 /tmp/sql_output.log 2>/dev/null || echo "No output log"
        echo ""
        return 1
    fi
}

# Test database connection
echo -e "${YELLOW}Testing database connection...${NC}"
if docker exec ${CONTAINER_NAME} /opt/mssql-tools18/bin/sqlcmd -S ${DB_SERVER} -U ${DB_USER} -P "${DB_PASSWORD}" -d ${DB_NAME} -C -Q "SELECT @@VERSION" -W -b > /dev/null 2>&1 || \
   docker exec ${CONTAINER_NAME} /opt/mssql-tools/bin/sqlcmd -S ${DB_SERVER} -U ${DB_USER} -P "${DB_PASSWORD}" -d ${DB_NAME} -C -Q "SELECT @@VERSION" -W -b > /dev/null 2>&1 || \
   docker exec ${CONTAINER_NAME} sqlcmd -S ${DB_SERVER} -U ${DB_USER} -P "${DB_PASSWORD}" -d ${DB_NAME} -C -Q "SELECT @@VERSION" -W -b > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Cannot connect to database!${NC}"
    echo "Please check container and database configuration."
    exit 1
fi

echo ""

# Run scripts in order
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 1: Import Students${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-students-from-mock.sql" "Import Students"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 2: Import Enrollments (includes Classes)${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-enrollments-from-mock.sql" "Import Enrollments"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 3: Import Assignments${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-assignments-from-mock.sql" "Import Assignments"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 4: Import Materials${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-materials-from-mock.sql" "Import Materials"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 5: Import Class Sessions${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-class-sessions-from-mock.sql" "Import Class Sessions"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 6: Import Payments${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-payments-from-mock.sql" "Import Payments"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 7: Import Notifications${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-notifications-from-mock.sql" "Import Notifications"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 8: Import Attendance Records${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-attendance-from-mock.sql" "Import Attendance Records"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 9: Create Missing Tables${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "create-missing-tables.sql" "Create Missing Tables"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 10: Import Grades${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-grades-from-mock.sql" "Import Grades"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 11: Import Submissions${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-submissions-from-mock.sql" "Import Submissions"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 12: Import Surveys${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-surveys-from-mock.sql" "Import Surveys"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 13: Import News/Announcements${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-news-from-mock.sql" "Import News/Announcements"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 14: Import Videos${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-videos-from-mock.sql" "Import Videos"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 15: Import Tasks${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-tasks-from-mock.sql" "Import Tasks"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 16: Import Tickets${NC}"
echo -e "${BLUE}========================================${NC}"
run_sql_script "import-tickets-from-mock.sql" "Import Tickets"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ All mock data imported successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Note: Make sure you have already run:${NC}"
echo -e "  - import-teachers-from-homepage.sql"
echo -e "  - import-courses-from-mock.sql"
echo ""

