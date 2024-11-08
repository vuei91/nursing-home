package com.nursing.home.server.config;

import com.nursing.home.server.jwt.JwtAuthenticationFilter;
import com.nursing.home.server.oauth2.OAuth2SuccessHandler;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Slf4j
@Configuration
@Configurable
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final DefaultOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @PostConstruct
    public void init() {
        log.info("frontend_url= {}", frontendUrl);
        log.info("db_url = {}", url);
        log.info("db_username = {}", username);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        //csrf disable
        httpSecurity
            .csrf(AbstractHttpConfigurer::disable) // csrf disable
            .formLogin(AbstractHttpConfigurer::disable) // formLogin disable
            .httpBasic(AbstractHttpConfigurer::disable) // httpBasic disable
            .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // session stateless
            .authorizeHttpRequests((auth) -> auth
                    .requestMatchers("/oauth2/**").permitAll() // oauth2 접근 가능처리
                    .anyRequest().authenticated()) // 그 외의 루트경로는 인증이 끝난 후 접근 가는
            .oauth2Login(oauth -> oauth
                    .redirectionEndpoint(endPoint -> endPoint.baseUri("/oauth2/callback/*"))
                    .userInfoEndpoint(endPoint -> endPoint.userService(oAuth2UserService))
                    .successHandler(oAuth2SuccessHandler))
            .exceptionHandling(e -> e.authenticationEntryPoint(authenticationEntryPoint))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .cors((corsCustomizer -> corsCustomizer.configurationSource((request) -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.addAllowedOrigin(frontendUrl);
                    configuration.addAllowedMethod("*");
                    configuration.addAllowedHeader("*");
                    configuration.setAllowCredentials(true);
                    configuration.setMaxAge(3600L);
                    configuration.addExposedHeader("Authorization");
                    return configuration; })));

        return httpSecurity.build();
    }
}
