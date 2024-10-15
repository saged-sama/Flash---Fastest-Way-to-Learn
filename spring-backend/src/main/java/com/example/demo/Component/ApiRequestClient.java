package com.example.demo.Component;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Component
public class ApiRequestClient {

    private final RestTemplate restTemplate;

    public ApiRequestClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public <T> T sendGetRequest(String url, Map<String, String> queryParams, Class<T> responseType, String authToken) {

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        if (queryParams != null) {
            queryParams.forEach(uriBuilder::queryParam);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authToken);

        HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<T> response = restTemplate.exchange(
            uriBuilder.toUriString(),
            HttpMethod.GET,
            requestEntity,
            responseType
        );

        return response.getBody();
    }

    public <T> T sendPostRequest(String url, Object payload, Map<String, String> queryParams, Class<T> responseType, String authToken) {

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        if (queryParams != null) {
            queryParams.forEach(uriBuilder::queryParam);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authToken);

        HttpEntity<Object> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<T> response = restTemplate.exchange(
            uriBuilder.toUriString(),
            HttpMethod.POST,
            requestEntity,
            responseType
        );

        return response.getBody();
    }

    public <T> T sendDeleteRequest(String url, Map<String, String> queryParams, Class<T> responseType) {
        
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        if (queryParams != null) {
            queryParams.forEach(uriBuilder::queryParam);
        }

        ResponseEntity<T> response = restTemplate.exchange(
            uriBuilder.toUriString(),
            HttpMethod.DELETE,
            null,
            responseType
        );

        return response.getBody();
    }

    public <T> T sendPatchRequest(String url, Object payload, Map<String, String> queryParams, Class<T> responseType) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        if (queryParams != null) {
            queryParams.forEach(uriBuilder::queryParam);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<T> response = restTemplate.exchange(
            uriBuilder.toUriString(),
            HttpMethod.PATCH,
            requestEntity,
            responseType
        );

        return response.getBody();
    }
}
