"use client";

import React, { useState } from 'react';
import "./globals.css";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Casinha', '/', <PieChartOutlined />,),
  getItem('Estoque', '', <DesktopOutlined />,
    [
      getItem('Incluir Produto', '/novoProduto', <PlusOutlined />),
      getItem('Ver Produtos', '/produtos', <DownOutlined />)
    ]
  ),
  getItem('Profile', '', <UserOutlined />, [
    getItem('Listar todos', '/usuarios'),
    getItem('Meu Perfil', '/perfil'),
  ]),
  getItem('Configurações', '/c', <SettingOutlined />),
  getItem('Sobre', '/d', <FileOutlined />),
];

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter()


  return (
    <html >
      <body >
        <Layout style={{ minHeight: '100vh', maxHeight: '100vh', minWidth: '100%', maxWidth: '100%' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu onSelect={({ key }) => router.push(key)} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '0', background: colorBgContainer }}>

              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Dottis :D
            </Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
};

export default CustomLayout;