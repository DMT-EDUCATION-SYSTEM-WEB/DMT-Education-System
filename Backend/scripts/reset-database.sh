#!/bin/bash

# Script to completely reset the database
# WARNING: This will delete all data!
# Usage: ./scripts/reset-database.sh

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "⚠️  WARNING: Database Reset"
echo "=================================="
echo ""
echo "This will:"
echo "  1. Drop the existing database"
echo "  2. Create a fresh database"
echo "  3. Import the schema"
echo "  4. Seed sample data"
echo ""
echo "ALL DATA WILL BE LOST!"
echo ""
read -p "Are you sure? Type 'yes' to continue: " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Operation cancelled"
    exit 0
fi

echo "🔄 Starting database reset..."
echo ""

# Step 1: Create database and import schema
echo "Step 1/2: Creating database and importing schema..."
node "$SCRIPT_DIR/create-database.mjs" || {
    echo "❌ Failed to create database"
    exit 1
}

echo ""
echo "Step 2/2: Seeding sample data..."
node "$SCRIPT_DIR/seed-data.mjs" || {
    echo "❌ Failed to seed data"
    exit 1
}

echo ""
echo "=================================="
echo "✅ Database reset completed!"
echo "=================================="
echo ""
echo "You can now start the backend server"
echo ""
