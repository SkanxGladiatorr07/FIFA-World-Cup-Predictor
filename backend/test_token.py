#!/usr/bin/env python3
"""
Test script to verify JWT token generation and validation
"""
from app.core.security import create_access_token, decode_token
from app.core.config import settings

print("=== JWT Token Test ===\n")

# Test data
test_user_id = 2  # Skan's user ID

# Create token
print(f"Creating token for user_id: {test_user_id}")
token = create_access_token(data={"sub": test_user_id})
print(f"Token created: {token[:50]}...")
print(f"Token length: {len(token)}")
print(f"Token starts with 'eyJ': {token.startswith('eyJ')}")

# Decode token
print("\nDecoding token...")
payload = decode_token(token)

if payload:
    print("✓ Token is VALID")
    print(f"  Payload: {payload}")
    print(f"  User ID: {payload.get('sub')}")
    print(f"  Token type: {payload.get('type')}")
    print(f"  Expires: {payload.get('exp')}")
else:
    print("✗ Token is INVALID")

print("\n=== Test Complete ===")
