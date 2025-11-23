#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "Verifying API endpoints..."

# Health Check
echo "Checking Health..."
curl -s "$BASE_URL/../" | grep "Portfolio API is running" && echo "Health Check Passed" || echo "Health Check Failed"

# Get Skills
echo "Getting Skills..."
curl -s "$BASE_URL/skills" | grep "JavaScript" && echo "Get Skills Passed" || echo "Get Skills Failed"

# Get Experience
echo "Getting Experience..."
curl -s "$BASE_URL/experiences" | grep "Tech Corp" && echo "Get Experience Passed" || echo "Get Experience Failed"

# Get Projects
echo "Getting Projects..."
curl -s "$BASE_URL/projects" | grep "Portfolio" && echo "Get Projects Passed" || echo "Get Projects Failed"

echo "Verification Complete"
