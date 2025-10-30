#!/bin/bash

echo "🔍 Testing Frontend-Backend Integration..."
echo "=========================================="
echo ""

echo "1️⃣ Backend Health Check:"
HEALTH=$(curl -s http://localhost:3001/health)
if [ -n "$HEALTH" ]; then
    echo "✅ Backend is running"
    echo "$HEALTH" | python3 -m json.tool
else
    echo "❌ Backend not responding"
    exit 1
fi
echo ""

echo "2️⃣ Auth API Test:"
LOGIN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dmt.edu.vn","password":"admin123"}')
  
if echo "$LOGIN" | grep -q "token"; then
    echo "✅ Login successful"
    TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
    echo "Token: ${TOKEN:0:50}..."
else
    echo "❌ Login failed"
    echo "$LOGIN"
    exit 1
fi
echo ""

echo "3️⃣ Protected Route Test:"
ME=$(curl -s http://localhost:3001/auth/me \
  -H "Authorization: Bearer $TOKEN")
  
if echo "$ME" | grep -q "email"; then
    echo "✅ Protected route works"
    echo "$ME" | python3 -m json.tool
else
    echo "❌ Protected route failed"
    echo "$ME"
fi
echo ""

echo "4️⃣ CORS Configuration:"
CORS=$(curl -s -I -X OPTIONS http://localhost:3001/auth/login \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" 2>&1 | grep -i "access-control")
  
if [ -n "$CORS" ]; then
    echo "✅ CORS configured"
    echo "$CORS"
else
    echo "⚠️  CORS headers not found (might be OK if server allows all origins)"
fi
echo ""

echo "=========================================="
echo "✅ Backend Integration Test Complete!"
echo ""
echo "📝 Test Accounts:"
echo "   Admin:   admin@dmt.edu.vn    / admin123"
echo "   Staff:   staff@dmt.edu.vn    / staff123"
echo "   Teacher: teacher@dmt.edu.vn  / teacher123"
echo "   Student: student@dmt.edu.vn  / student123"
echo ""
echo "🌐 Services:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo "   Health:   http://localhost:3001/health"
echo "=========================================="
