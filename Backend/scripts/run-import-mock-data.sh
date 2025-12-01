#!/bin/bash

# =================================================================
# Script to import all mock data from frontend into SQL Server
# =================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_SERVER="${DB_SERVER:-localhost}"
DB_USER="${DB_USER:-sa}"
DB_PASSWORD="${DB_PASSWORD:-Password123!}"
DB_NAME="${DB_NAME:-DMT_EDUCATION_SYSTEM}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Import Mock Data to SQL Server${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if sqlcmd is available
if ! command -v sqlcmd &> /dev/null; then
    echo -e "${RED}❌ sqlcmd not found!${NC}"
    echo "Please install SQL Server command-line tools:"
    echo "  macOS: brew install mssql-tools"
    echo "  Linux: https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools"
    exit 1
fi

# Function to run SQL script
run_sql_script() {
    local script_file=$1
    local description=$2
    
    if [ ! -f "$script_file" ]; then
        echo -e "${RED}❌ Script not found: $script_file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}Running: $description${NC}"
    echo -e "${BLUE}File: $script_file${NC}"
    
    sqlcmd -S "$DB_SERVER" \
           -U "$DB_USER" \
           -P "$DB_PASSWORD" \
           -d "$DB_NAME" \
           -i "$script_file" \
           -W \
           -b
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $description completed${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}❌ $description failed${NC}"
        echo ""
        return 1
    fi
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}Script directory: $SCRIPT_DIR${NC}"
echo -e "${BLUE}Database: $DB_NAME on $DB_SERVER${NC}"
echo ""

# Check database connection
echo -e "${YELLOW}Testing database connection...${NC}"
sqlcmd -S "$DB_SERVER" \
       -U "$DB_USER" \
       -P "$DB_PASSWORD" \
       -d "$DB_NAME" \
       -Q "SELECT @@VERSION" \
       -W \
       -b > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Cannot connect to database!${NC}"
    echo "Please check:"
    echo "  1. SQL Server is running"
    echo "  2. Database '$DB_NAME' exists"
    echo "  3. Credentials are correct"
    exit 1
fi

echo -e "${GREEN}✅ Database connection successful${NC}"
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

