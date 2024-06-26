import React from 'react';
import styled from 'styled-components';
import {
  bold20,
  regular14,
  regular16,
  regular18,
  regular20,
} from '../../styles/fontSize';
import Button from '.././Button/Button';
import ProfileImage from '../PostId/Nav/ProfileImage';
import { USER_STATE } from '../../utils/USER_SET';
import parse from 'html-react-parser';

function CardModal({
  onClick,
  id,
  src,
  name,
  cardFont,
  userState,
  cardContent,
  cardCreatedAt,
}) {
  const parseContent = parse(cardContent);

  return (
    <ModalWrapper>
      <ModalContainer>
      <ModalContentAll>
        <ModalProfile>
          <Profile>
            <ProfileImage size={56} imgUrl={src} />
            <ProfileInform>
              <ProfileName>
                From. <span>{name}</span>
              </ProfileName>
              <ProfileRelation userstate={userState}>
                {userState}
              </ProfileRelation>
            </ProfileInform>
          </Profile>
          <ProfileUpdated>{cardCreatedAt}</ProfileUpdated>
        </ModalProfile>
        <ModalContent cardFont={cardFont}>{parseContent}</ModalContent>
        </ModalContentAll>
        <Button text={'확인'} onClick={onClick} />
      </ModalContainer>
    </ModalWrapper>
  );
}

export default CardModal;

const ModalWrapper = styled.div`
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.div`
  width: 600px;
  height: 476px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  z-index: 1000;
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  & button {
    border-radius: 6px;
    margin: 0 auto;
    width: 120px;
    height: 40px;
    align-items: end;
    ${regular16}
  }

  @media (max-width: 768px) {
    margin: 0 auto;;
  max-width: 480px;
  max-height: 380px;
  }

`;

const ModalProfile = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 19px;
  border-bottom: 1px solid var(--gray200);
`;

const Profile = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileUpdated = styled.div`
  ${regular14}
  color: var(--gray400);
`;

const ProfileInform = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const ProfileName = styled.div`
  ${regular20}
  & span {
    ${bold20}
  }
`;

const ProfileRelation = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'userstate',
})`
  background: ${({ userstate }) => USER_STATE[userstate]?.background};
  color: ${({ userstate }) => USER_STATE[userstate]?.color};
  padding: 0 8px;
  border-radius: 4px;
  width: fit-content;
  ${regular14}
`;

const ModalContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'cardFont',
})`
  ${regular18}
  max-height: 256px;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: ${(props) => props.cardFont};
`;

const ModalContentAll = styled.div`
  display: flex;
  flex-direction: column;
  gap : 1rem
`  