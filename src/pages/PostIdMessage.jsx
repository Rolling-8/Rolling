import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage } from '../api/messageApi';
import { getProfileImages } from '../api/etcApi';
import styled from 'styled-components';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button/Button';
import InputBox from '../components/PostIdMessage/InputBox';
import SelectBox from '../components/SelectBox';
import QuillEditor from '../components/PostIdMessage/QuillEditor';
import ProfileImage from '../components/PostId/Nav/ProfileImage';
import { regular16 } from '../styles/fontSize';

const RELATIONSHIP_ARR = ['지인', '친구', '동료', '가족'];
const FONT_ARR = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

function PostIdMessage() {
  const [profileImgArr, setProfileImgArr] = useState([]);
  const [sender, setSender] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('Noto Sans');
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSenderChange = (e) => {
    setSender(e.target.value.trim());
  };

  const handleProfileClick = (e) => {
    setProfileImageURL(e.target.currentSrc);
  };

  const handleRelationClick = (e) => {
    setRelationship(e.target.innerText.trim());
  };

  const handleFontClick = (e) => {
    setFont(e.target.innerText);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        recipientId: id,
        sender: sender,
        profileImageURL: profileImageURL,
        relationship: relationship,
        content: content,
        font: font,
      };
      console.log(data);
      await createMessage(id, data);
      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    async function fetchItemData() {
      const arr = await getProfileImages();
      setProfileImgArr(arr);
      setProfileImageURL(arr[0]);
    }
    fetchItemData();
  }, []);

  console;

  return (
    <>
      <Header />
      <Container>
        <Section>
          <SectionTitle title="From." />
          <InputBox
            name="sender"
            value={sender}
            onChange={handleSenderChange}
            placeholder="이름을 입력해 주세요."
          />
        </Section>
        <Section>
          <SectionTitle title="프로필 이미지" />
          <ImgContainer>
            <SelectedImg>
              <ProfileImage imgUrl={profileImageURL} size="80" />
            </SelectedImg>
            <div>
              <SectionDesc>프로필 이미지를 선택해주세요!</SectionDesc>
              <ImgWrapper onClick={handleProfileClick}>
                {profileImgArr.map((url, i) => {
                  return (
                    <li key={i}>
                      <ProfileImage
                        imgUrl={url}
                        size={isMobile ? '40' : '53'}
                      />
                    </li>
                  );
                })}
              </ImgWrapper>
            </div>
          </ImgContainer>
        </Section>
        <Section>
          <SectionTitle title="상대와의 관계" />
          <SelectBox
            onClick={handleRelationClick}
            options={RELATIONSHIP_ARR}
            width={isMobile ? '100%' : '320px'}
          />
        </Section>
        <Section>
          <SectionTitle title="내용을 입력해 주세요" />
          <QuillEditor onChange={setContent} />
        </Section>
        <Section>
          <SectionTitle title="폰트 선택" />
          <SelectBox
            onClick={handleFontClick}
            options={FONT_ARR}
            width={isMobile ? '100%' : '320px'}
          />
        </Section>

        <Button
          disabled={!sender}
          text="생성하기"
          width="100%"
          onClick={handleSubmit}
        />
      </Container>
    </>
  );
}

export default PostIdMessage;

const Container = styled.main`
  width: 720px;
  margin: 112px auto 24px auto;
  box-sizing: border-box;

  @media (max-width: 730px) {
    width: 100vw;
    padding: 0 20px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 38px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 32px;

  @media (max-width: 730px) {
    align-items: center;
  }
`;

const SelectedImg = styled.div`
  flex: 1;
`;

const SectionDesc = styled.p`
  color: var(--gray500);
  ${regular16}
  line-height: 26px;
`;

const ImgWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 12px;
`;
