#!/bin/bash

# DMT Education System - Docker Configuration Check
# This script verifies Docker and SQL Server container status

echo "🔍 DMT Education System - Docker Configuration Check"
echo "============================================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="dmt-sqlserver"
SQL_PORT=1433
DATABASE_NAME="DMT_EDUCATION_SYSTEM"

echo -e "\n${BLUE}[1/5]${NC} Checking Docker Installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo -e "${GREEN}✅ Docker is installed${NC}"
docker --version

echo -e "\n${BLUE}[2/5]${NC} Checking Docker Daemon..."
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker daemon is not running!${NC}"
    echo "Please start Docker Desktop application"
    exit 1
fi
echo -e "${GREEN}✅ Docker daemon is running${NC}"

echo -e "\n${BLUE}[3/5]${NC} Checking SQL Server Container Status..."
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${GREEN}✅ Container '${CONTAINER_NAME}' exists${NC}"
    
    # Check if container is running
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "${GREEN}✅ Container is running${NC}"
        
        # Get container details
        echo -e "\n${BLUE}📊 Container Details:${NC}"
        docker inspect ${CONTAINER_NAME} --format='   Image: {{.Config.Image}}'
        docker inspect ${CONTAINER_NAME} --format='   Status: {{.State.Status}}'
        docker inspect ${CONTAINER_NAME} --format='   Started: {{.State.StartedAt}}'
        docker inspect ${CONTAINER_NAME} --format='   Ports: {{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}} {{end}}'
    else
        echo -e "${YELLOW}⚠️  Container exists but is not running${NC}"
        echo -e "${BLUE}   To start it, run: ${NC}docker start ${CONTAINER_NAME}"
    fi
else
    echo -e "${RED}❌ Container '${CONTAINER_NAME}' does not exist${NC}"
    echo -e "${BLUE}   To create it, run: ${NC}./Backend/setup-sqlserver.sh"
fi

echo -e "\n${BLUE}[4/5]${NC} Checking Port ${SQL_PORT}..."
if lsof -Pi :${SQL_PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Port ${SQL_PORT} is in use (SQL Server is listening)${NC}"
    lsof -Pi :${SQL_PORT} -sTCP:LISTEN
else
    echo -e "${YELLOW}⚠️  Port ${SQL_PORT} is not in use${NC}"
    echo "   SQL Server might not be running or not accessible"
fi

echo -e "\n${BLUE}[5/5]${NC} Checking Backend Configuration..."
ENV_FILE="./Backend/.env"
if [ -f "$ENV_FILE" ]; then
    echo -e "${GREEN}✅ Backend .env file exists${NC}"
    echo -e "\n${BLUE}📝 Current SQL Server Configuration:${NC}"
    grep "^DB_" "$ENV_FILE" | while read line; do
        key=$(echo "$line" | cut -d'=' -f1)
        value=$(echo "$line" | cut -d'=' -f2)
        if [[ "$key" == "DB_PASSWORD" ]]; then
            echo "   $key=********"
        else
            echo "   $line"
        fi
    done
else
    echo -e "${RED}❌ Backend .env file not found${NC}"
fi

# Summary
echo -e "\n${GREEN}============================================================${NC}"
echo -e "${GREEN}📋 Summary${NC}"
echo -e "${GREEN}============================================================${NC}"

# Check all conditions
all_good=true

if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker daemon is not running${NC}"
    all_good=false
fi

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${YELLOW}⚠️  SQL Server container is not running${NC}"
    all_good=false
fi

if ! lsof -Pi :${SQL_PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  SQL Server port ${SQL_PORT} is not accessible${NC}"
    all_good=false
fi

if [ "$all_good" = true ]; then
    echo -e "\n${GREEN}✅ All checks passed! Your environment is ready.${NC}"
    echo -e "\n${BLUE}🚀 Next Steps:${NC}"
    echo -e "   Run: ${GREEN}./start-dev.sh${NC}"
else
    echo -e "\n${YELLOW}⚠️  Some issues were found. Please fix them before running the application.${NC}"
    echo -e "\n${BLUE}🔧 Quick Fix Commands:${NC}"
    
    if ! docker info &> /dev/null; then
        echo -e "   1. Start Docker Desktop application"
    fi
    
    if ! docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "   2. Setup SQL Server: ${GREEN}cd Backend && ./setup-sqlserver.sh${NC}"
    elif ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo -e "   2. Start SQL Server: ${GREEN}docker start ${CONTAINER_NAME}${NC}"
    fi
fi

echo ""






