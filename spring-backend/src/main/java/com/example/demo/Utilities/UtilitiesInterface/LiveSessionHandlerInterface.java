package com.example.demo.Utilities.UtilitiesInterface;

public interface LiveSessionHandlerInterface {
    public String generateManagementToken();
    public String generateClientToken(String room_id, String user_id, String role);
}