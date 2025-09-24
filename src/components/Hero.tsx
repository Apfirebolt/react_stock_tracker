import React from 'react';
import { Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

interface HeroProps {
  randomNumber: number;
}

const Hero: React.FC<HeroProps> = () => {

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
            padding: '1rem',
            textAlign: 'center',
            color: 'white'
        }}>
            <Space direction="vertical" size="large">
                <Title level={1} style={{ color: 'white', margin: 0 }}>
                    Welcome to Stock Tracker App
                </Title>
                <img
                    src="https://musicart.xboxlive.com/7/ac6d5100-0000-0000-0000-000000000002/504/image.jpg"
                    alt="Stock Tracker"
                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: "20px" }}
                />
                <Paragraph style={{ color: 'white', fontSize: '18px', margin: 0 }}>
                    Track your favorite stocks and stay updated with real-time data.
                </Paragraph>
            </Space>
        </div>
    );
};

export default Hero;