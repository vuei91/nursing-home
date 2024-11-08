package com.nursing.home.server.oauth2;

import com.nursing.home.server.entity.Member;
import com.nursing.home.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);
        String oAuthClientName = request.getClientRegistration().getClientName();

        Member member = null;
        String username = null;

        if(oAuthClientName.equals("kakao")) {
            username = "kakao_"+oAuth2User.getAttributes().get("id");
            String name = (String)((Map<String, Object>) oAuth2User.getAttributes().get("properties")).get("nickname");
            member = Member.builder().username(username).type("kakao").name(name).build();
        }

        if(oAuthClientName.equals("naver")) {
            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
            username = "naver_" + responseMap.get("id").substring(0,14);
            String email = responseMap.get("email");
            String name = responseMap.get("name");
            String phone = responseMap.get("mobile");
            member = Member.builder().username(username).type("naver").email(email).name(name).phone(phone).build();
        }

        Member newMember;
        Member oldMember = memberRepository.findByUsername(username).orElse(null);
        if(oldMember == null) {
            newMember = memberRepository.save(member);
        } else {
            newMember = oldMember;
        }
        return new CustomOAuth2User(newMember.getUsername());
    }
}
