import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import { Header, Form, Label, Input, Error, Button, LinkContainer, Success } from './styles';
import useSWR from 'swr';
import { Navigate } from 'react-router';

const Login = () => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [logInError, setLogInError] = useState('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError('');
      console.log(email, password);
      if (!email || !password) {
        setLogInError('아이디 및 패스워드를 입력하세요.');
        return;
      }
      axios
        .post('/api/users/login', { email, password }, { withCredentials: true })
        .then((response) => {
          mutate(response.data, true); // 서버 요청 보내지 않고, 입력값을 넣음. OPTIMISTIC UI
          //revalidate(); // user정보 재조회
        })
        .catch((error) => {
          setLogInError(error.response.data);
        });
    },
    [email, password],
  );
  if (data === undefined) {
    return <div>fheldwnd...</div>;
  }
  if (data) {
    return <Navigate replace to="/workspace/sleact/channel/일반" />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>{logInError}</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};
export default Login;
