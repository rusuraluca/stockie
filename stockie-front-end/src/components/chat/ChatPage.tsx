import React, { useState, useEffect } from 'react';
// @ts-ignore
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import { Box, Container, TextField, Button } from '@mui/material';
import {Formik, Form, FormikHelpers, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { DEV_BACKEND_API_URL } from '../../constants';

interface Message {
    sender: string;
    message: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');
    const [subscription, setSubscription] = useState<any>(null);

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        const data = { message, nickname };
        subscription.send(data);
        setMessage('');
    };

    const handleReceivedMessage = (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
    };

    useEffect(() => {
        const cable = ActionCable.createConsumer(`${DEV_BACKEND_API_URL}/cable`);
        const sub = cable.subscriptions.create(
            {
                channel: 'ChatChannel',
                nickname: nickname,
            },
            {
                connected: () => {
                    console.log('Connected to Action Cable');
                },
                received: handleReceivedMessage,
            }
        );
        setSubscription(sub);

        return () => {
            sub.unsubscribe();
        };
    }, [nickname]);

    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required('Nickname is required'),
    });

    const initialValues = { nickname: '' };

    const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
        setNickname(values.nickname);
        formikHelpers.resetForm();
    };

    return (
        <Container>
            <ActionCableProvider url={`${DEV_BACKEND_API_URL}/cable`}>
                <h1 style={{ margin: '24px 0' }}>Chat</h1>
                <Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="form-group">
                                <TextField
                                    name="nickname"
                                    label="Enter a nickname"
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                />
                            </div>
                            <div>
                                {messages.map((msg: Message, index: number) => (
                                    <div key={index}>
                                        <strong>{msg.sender}: </strong>
                                        {msg.message}
                                    </div>
                                ))}
                            </div>
                            <div className="form-group">
                                <TextField
                                    name="message"
                                    label="Enter a message"
                                    value={message}
                                    onChange={handleMessageChange}
                                />
                                { nickname && (
                                    <button type="submit" className="btn btn-primary btn-block mt-3 m-3" onClick={handleSend}>
                                        Send
                                    </button>
                                )}
                            </div>
                            <ActionCableConsumer channel={{ channel: 'ChatChannel' }} />
                        </Form>
                    </Formik>
                </Box>
            </ActionCableProvider>
        </Container>
    );
};

export default Chat;
