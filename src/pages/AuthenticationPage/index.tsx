import { Button, Form } from 'antd';
import { styled } from 'styled-components';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_TOKEN } from '../../graphql/mutations/authentication';
import { useEffect } from 'react';
import { TOKEN_KEY } from '../../contstants';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import colors from '../../colors';

const StyledButton = styled(Button)<{ primary?: number }>`
  border-radius: 16px;
  background-color: ${(props) => (props.primary ? colors.red : colors.offWhite)};
  height: 47px;
  padding: 14px 16px 14px 16px;
  color: ${(props) => (props.primary ? colors.offWhite : colors.fontBlack)};
`;

const AuthenticationPage: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [getToken, { data: getTokenData, error: getTokenError }] = useMutation(GET_TOKEN);
  const [createUser, { data: createUserData, error: createUserError }] = useMutation(CREATE_USER);

  const handleLogin = () => {
    form.validateFields().then((values) => {
      getToken({ variables: { email: values.email, password: values.password } });
    });
  };

  const handleSignup = () => {
    form
      .validateFields()
      .then((values) =>
        createUser({ variables: { email: values.email, password: values.password } })
      );
  };

  useEffect(() => {
    if (createUserData && !createUserError) {
      const { email, password } = form.getFieldsValue();
      getToken({ variables: { email, password } });
    }
  }, createUserData);

  useEffect(() => {
    if (getTokenData?.token && getTokenError) {
      localStorage.setItem(TOKEN_KEY, getTokenData.token);
      navigate(routes.todoList);
    }
  }, getTokenData);

  return (
    <Layout>
      Sign Up or Log In
      <Form
        name="authentication"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={() => console.log('onFinish')}
        onFinishFailed={() => console.log('onFinishFailed')}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <InputField placeholder="E-Mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              min: 8,
              message: 'Password must contain 8 or more characters.'
            }
          ]}
        >
          <InputField placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <StyledButton onClick={handleLogin}>Log in</StyledButton>
          <StyledButton primary={+true} onClick={handleSignup}>
            Sign up
          </StyledButton>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AuthenticationPage;
