package com.example.demo.StripeCustomer;
import lombok.Data;

@Data
public class StripeResponse {
    private String status;
    private String message;
    private String sessionId;
    private String sessionUrl;

    public String getStatus() {
        return this.status;
    }

    public StripeResponse() {
    }

    public StripeResponse(String status, String message, String sessionId, String sessionUrl) {
        this.status = status;
        this.message = message;
        this.sessionId = sessionId;
        this.sessionUrl = sessionUrl;
    }

    public static class StripeResponseBuilder {
        private String status;
        private String message;
        private String sessionId;
        private String sessionUrl;

        StripeResponseBuilder() {
        }

        public StripeResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public StripeResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public StripeResponseBuilder sessionId(String sessionId) {
            this.sessionId = sessionId;
            return this;
        }

        public StripeResponseBuilder sessionUrl(String sessionUrl) {
            this.sessionUrl = sessionUrl;
            return this;
        }

        public StripeResponse build() {
            return new StripeResponse(status, message, sessionId, sessionUrl);
        }

        public String toString() {
            return "StripeResponse.StripeResponseBuilder(status=" + this.status + 
                   ", message=" + this.message + 
                   ", sessionId=" + this.sessionId + 
                   ", sessionUrl=" + this.sessionUrl + ")";
        }
    }

    // Static builder method (generated by @Builder)
    public static StripeResponseBuilder builder() {
        return new StripeResponseBuilder();
    }
}