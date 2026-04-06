import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Table, Input } from "antd";
import {
  DashboardOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import styles from "./Admin.module.scss";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/USERNAME/REPO/main/QA.json")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const filteredData = data.filter((item) =>
    item.question?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Time",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

  return (
    <Layout className={styles.container}>
      
      {/* SIDEBAR */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className={styles.logo}>ADMIN</div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <MessageOutlined />,
              label: "Chat Logs",
            },
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        <Header className={styles.header}>
          <h2>CIDIO 3</h2>
        </Header>

        <Content className={styles.content}>
          
          {/* CARDS */}
          <div className={styles.cards}>
            <Card title="Total QA" className={styles.card}>
              {data.length}
            </Card>

            <Card title="Search Results" className={styles.card}>
              {filteredData.length}
            </Card>
          </div>

          {/* SEARCH */}
          <Input
            className={styles.search}
            placeholder="🔍 Tìm kiếm câu hỏi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* TABLE */}
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;