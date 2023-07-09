import { Form, Row } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_TOKEN } from '../../graphql/mutations/authentication';
import { useEffect } from 'react';
import { TOKEN_KEY } from '../../constants';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Title from '../../components/Title';
import colors from '../../colors';

const AuthenticationPage: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [getToken, { data: getTokenData, error: getTokenError }] = useMutation(GET_TOKEN);
  const [createUser, { data: createUserData, error: createUserError }] = useMutation(CREATE_USER);

  const handleLogin: VoidFunction = () => {
    form.validateFields().then((values) => {
      getToken({ variables: { email: values.email, password: values.password } });
    });
  };

  const handleSignup: VoidFunction = () => {
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
  }, [createUserData]);

  useEffect(() => {
    if (getTokenData?.token && !getTokenError) {
      localStorage.setItem(TOKEN_KEY, getTokenData.token);
      navigate(routes.todoList);
    }
  }, [getTokenData]);

  return (
    <Layout>
      <Title>Sign Up or Log In</Title>
      <Form
        name="authentication"
        form={form}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: '100%', marginTop: '8px' }}
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

        {(getTokenError || createUserError) && (
          <Row style={{ marginBottom: '10px', marginTop: '-10px' }}>
            <Title $color={colors.red}>User does not exist or wrong password.</Title>
          </Row>
        )}

        <Row style={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleLogin} label="Log in" style={{ marginRight: '10px' }} />
          <Button primary={+true} onClick={handleSignup} label="Sign up" />
        </Row>
      </Form>
    </Layout>
  );
};

export default AuthenticationPage;
