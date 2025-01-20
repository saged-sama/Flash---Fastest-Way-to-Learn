package com.example.demo.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.Auth.JwtAuthFilter;
import com.example.demo.Users.UsersSecurityDetailsService;
import com.example.demo.Websocket.WebSocketFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UsersSecurityDetailsService usersService;

    @Autowired
    private JwtAuthFilter jwtFilter;

    @Autowired
    private WebSocketFilter webSocketFilter;

    @SuppressWarnings("unused")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(CorsConfigurer -> {
                CorsConfigurer.configurationSource(request -> {
                    var cors = new org.springframework.web.cors.CorsConfiguration();
                    cors.setAllowedOrigins(java.util.List.of("*"));
                    cors.setAllowedMethods(java.util.List.of("*"));
                    cors.setAllowedHeaders(java.util.List.of("*"));
                    return cors;
                });
            })
            .authorizeHttpRequests((authorize) -> 
            authorize
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/api/collections/users/auth-with-password").permitAll()
                .requestMatchers("/api/collections/users/email-verification").permitAll()
                .requestMatchers("/api/files/**").permitAll()
                .requestMatchers("/realtime/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/api/predict/**").permitAll()
                // .requestMatchers("/**").permitAll()
                .anyRequest().authenticated()
        ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterAfter(webSocketFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(usersService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
