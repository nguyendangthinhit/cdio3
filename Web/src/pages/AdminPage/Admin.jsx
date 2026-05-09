import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import {
  RobotOutlined, DashboardOutlined, TeamOutlined, MessageOutlined, UserOutlined,
  RiseOutlined, AppstoreOutlined, SearchOutlined, SyncOutlined, LoadingOutlined,
  PieChartOutlined, BarChartOutlined, HistoryOutlined,
  GlobalOutlined, BulbOutlined, LineChartOutlined,
} from "@ant-design/icons";
import styles from "./Admin.module.scss";

// ── Các nhóm category ─────────────────────────────────────────────────────────
const GROUP_1 = ["need_agent", "spam", "unrelated", "qa_match", "greeting", "bot_info"];
const GROUP_2 = ["tuyen_sinh", "can_clarify", "dinh_huong", "nhac_hen", "dang_ky", "none"];

const CATEGORY_COLORS = {
  need_agent: "#6366f1",
  spam:       "#10b981",
  unrelated:  "#f59e0b",
  qa_match:   "#ef4444",
  greeting:   "#06b6d4",
  bot_info:   "#ec4899",
};

// Chỉ dùng cho cột "Loại" trong bảng Logs
const classifyQuestion = (q = "") => {
  const text = q.toLowerCase();
  if (text.includes("học phí") || text.includes("chi phí") || text.includes("học bổng"))
    return "Học phí / Học bổng";
  if (text.includes("so sánh") || text.includes("so với"))
    return "So sánh ngành";
  if (text.includes("ngành") || text.includes("học gì") || text.includes("nên học"))
    return "Tư vấn ngành";
  if (text.includes("trường") || text.includes("duy tân") || text.includes("dtu"))
    return "Thông tin trường";
  if (text.includes("thư viện") || text.includes("cơ sở") || text.includes("phòng"))
    return "Cơ sở vật chất";
  if (text.includes("giảng dạy") || text.includes("đào tạo") || text.includes("chương trình"))
    return "Đào tạo / Giảng dạy";
  return "Khác";
};

const detectSource = (user_id = "") =>
  /^\d+$/.test(user_id.trim()) ? "mess" : "web";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#a78bfa"];

const shortUser = (id = "") =>
  id.length > 12 ? id.slice(0, 8) + "…" + id.slice(-4) : id;

const StatCard = ({ icon, label, value, color }) => (
  <div className={styles.statCard} style={{ borderTopColor: color }}>
    <div className={styles.statIcon} style={{ background: color + "22", color }}>{icon}</div>
    <div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const Admin = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedHistoryUser, setSelectedHistoryUser] = useState(null);
  const [needAgentOpen, setNeedAgentOpen] = useState(true);

  const GITHUB_RAW_URL =
    "https://raw.githubusercontent.com/nguyendangthinhit/cdio3/main/history.json";

  const fetchData = useCallback((isManual = false) => {
    if (isManual) setSyncing(true);
    fetch(`${GITHUB_RAW_URL}?t=${Date.now()}`)
      .then((r) => { if (!r.ok) throw new Error("Network error"); return r.json(); })
      .then((json) => { setData(json); setLastUpdated(new Date()); setLoading(false); setSyncing(false); })
      .catch(() => { setLoading(false); setSyncing(false); });
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => {
    const timer = setInterval(() => fetchData(), 30000);
    return () => clearInterval(timer);
  }, [fetchData]);

  const filtered = useMemo(
    () => data.filter((item) =>
      item.question?.toLowerCase().includes(search.toLowerCase()) ||
      item.user_id?.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search]
  );

  const queryByUser = useMemo(() => {
    const map = {};
    data.forEach(({ user_id }) => { map[user_id] = (map[user_id] || 0) + 1; });
    return Object.entries(map).map(([id, count]) => ({ name: shortUser(id), fullId: id, count }));
  }, [data]);

  const questionTypes = useMemo(() => {
    const map = {};
    data.forEach(({ question }) => { const c = classifyQuestion(question); map[c] = (map[c] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  const categoryStats = useMemo(() => {
    const map = {};
    [...GROUP_1, ...GROUP_2].forEach((c) => { map[c] = 0; });
    data.forEach(({ category }) => {
      if (!category) return;
      if (GROUP_2.includes(category)) {
        map[category] = (map[category] || 0) + 1;
        map["need_agent"] = (map["need_agent"] || 0) + 1;
      } else if (GROUP_1.includes(category)) {
        map[category] = (map[category] || 0) + 1;
      }
    });
    return map;
  }, [data]);

  const pieData = useMemo(
    () => GROUP_1.map((cat) => ({ name: cat, value: categoryStats[cat] || 0 })).filter((d) => d.value > 0),
    [categoryStats]
  );

  const top3Categories = useMemo(() => {
    const all = [...GROUP_1.filter((c) => c !== "need_agent"), ...GROUP_2];
    return all
      .map((cat) => ({ cat, count: categoryStats[cat] || 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [categoryStats]);

  const uniqueUsers = useMemo(() => {
    const map = {};
    data.forEach(({ user_id, timestamp }) => {
      if (!map[user_id]) map[user_id] = { user_id, count: 0, lastSeen: timestamp };
      map[user_id].count += 1;
      if (new Date(timestamp) > new Date(map[user_id].lastSeen)) map[user_id].lastSeen = timestamp;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [data]);

  const totalUsers = uniqueUsers.length;
  const avgQueriesPerUser = totalUsers ? (data.length / totalUsers).toFixed(1) : 0;

  const messengerCount = useMemo(() =>
    data.filter(({ user_id }) => detectSource(user_id) === "mess").length, [data]);
  const webCount = useMemo(() =>
    data.filter(({ user_id }) => detectSource(user_id) === "web").length, [data]);

  const trendByDate = useMemo(() => {
    const map = {};
    data.forEach(({ timestamp }) => {
      const d = new Date(timestamp);
      const key = `${d.getDate()}/${d.getMonth() + 1}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => {
        const [da, ma] = a[0].split("/").map(Number);
        const [db, mb] = b[0].split("/").map(Number);
        return ma !== mb ? ma - mb : da - db;
      })
      .map(([date, count]) => ({ date, count }));
  }, [data]);

  const selectedUserChats = useMemo(() => {
    if (!selectedHistoryUser) return [];
    return data
      .filter((item) => item.user_id === selectedHistoryUser)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [data, selectedHistoryUser]);

  if (loading) {
    return (
      <div className={`${styles.loadingScreen} ${darkMode ? styles.dark : ""}`}>
        <div className={styles.spinner} />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ""}`}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}><RobotOutlined /></span>
          <span className={styles.brandName}>Admin AI</span>
        </div>
        <nav className={styles.nav}>
          {[
            { id: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
            { id: "users",     icon: <TeamOutlined />,      label: "Người dùng" },
            { id: "logs",      icon: <MessageOutlined />,   label: "Chat Logs" },
            { id: "history",   icon: <HistoryOutlined />,   label: "Lịch sử" },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              className={`${styles.navItem} ${activeTab === id ? styles.navActive : ""}`}
              onClick={() => { setActiveTab(id); if (id !== "history") setSelectedHistoryUser(null); }}
            >
              <span className={styles.navIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <span>CDIO 3 · 2026</span>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <div className={styles.pageTitle}>
            {activeTab === "dashboard" && <><DashboardOutlined /> Dashboard</>}
            {activeTab === "users"     && <><TeamOutlined />      Người Dùng</>}
            {activeTab === "logs"      && <><MessageOutlined />   Chat Logs</>}
            {activeTab === "history"   && <><HistoryOutlined />   Lịch sử Chat</>}
          </div>
          <div className={styles.topBarRight}>
            <button
              className={`${styles.darkBtn} ${darkMode ? styles.darkBtnOn : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Chế độ sáng" : "Chế độ tối"}
            >
              <BulbOutlined />
            </button>
            <div className={styles.syncStatus}>
              <span className={syncing ? styles.syncDotActive : styles.syncDot} />
              <span className={styles.syncText}>
                {syncing ? "Đang đồng bộ..." : lastUpdated ? `Cập nhật ${lastUpdated.toLocaleTimeString("vi-VN")}` : "Chưa đồng bộ"}
              </span>
              <button className={styles.syncBtn} onClick={() => fetchData(true)} disabled={syncing} title="Refresh từ GitHub">
                {syncing ? <LoadingOutlined spin /> : <SyncOutlined />}
              </button>
            </div>
            <div className={styles.searchWrap}>
              <SearchOutlined className={styles.searchIcon} />
              <input className={styles.searchInput} placeholder="Tìm câu hỏi, user ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </header>

        <div className={styles.body}>
          {/* ══ DASHBOARD TAB ══ */}
          {activeTab === "dashboard" && (
            <>
              {/* Stat cards */}
              <div className={styles.statRow}>
                <StatCard icon={<MessageOutlined />} label="Tổng câu hỏi"   value={data.length}         color="#6366f1" />
                <StatCard icon={<UserOutlined />}    label="Người dùng"      value={totalUsers}           color="#10b981" />
                <StatCard icon={<RiseOutlined />}    label="TB câu hỏi/user" value={avgQueriesPerUser}    color="#f59e0b" />
                <StatCard icon={<AppstoreOutlined />}label="Loại câu hỏi"   value={questionTypes.length} color="#ec4899" />
                <StatCard icon={<MessageOutlined />} label="Messenger"        value={messengerCount}       color="#0ea5e9" />
                <StatCard icon={<GlobalOutlined />}  label="Web"              value={webCount}             color="#8b5cf6" />
              </div>

              {/* Row 1: Bar chart + Phân loại category */}
              <div className={styles.chartGrid2}>
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}><BarChartOutlined /> Số lượng Query theo Người dùng</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={queryByUser} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                      <XAxis dataKey="name" tick={{ fill: "#718096", fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
                      <YAxis tick={{ fill: "#718096", fontSize: 11 }} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }} formatter={(val, _, props) => [val, props.payload.fullId]} />
                      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}><PieChartOutlined /> Phân loại Câu hỏi Tổng quan</h3>
                  <div className={styles.pieRow}>
                    <ResponsiveContainer width="45%" height={240}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={52} paddingAngle={3}>
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={CATEGORY_COLORS[entry.name] || COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }} formatter={(val, name) => [val, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className={styles.catLegend}>
                      {GROUP_1.map((cat) => (
                        <div key={cat}>
                          <div className={styles.catItem} onClick={() => cat === "need_agent" && setNeedAgentOpen(!needAgentOpen)} style={{ cursor: cat === "need_agent" ? "pointer" : "default" }}>
                            <span className={styles.catDot} style={{ background: CATEGORY_COLORS[cat] }} />
                            <span className={styles.catName}>{cat}</span>
                            {cat === "need_agent" && <span className={styles.catChevron}>{needAgentOpen ? "∧" : "∨"}</span>}
                            <span className={styles.catCount}>{categoryStats[cat] || 0}</span>
                          </div>
                          {cat === "need_agent" && needAgentOpen && (
                            <div className={styles.catSub}>
                              {GROUP_2.map((sub) => (
                                <div key={sub} className={styles.catSubItem}>
                                  <span className={styles.catSubName}>{sub}</span>
                                  <span className={styles.catSubCount}>{categoryStats[sub] || 0}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Top 3 loại câu hỏi cần lưu ý */}
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}><RiseOutlined /> Top 3 Loại Câu hỏi Cần Lưu ý</h3>
                <div className={styles.top3CatList}>
                  {top3Categories.map(({ cat, count }, i) => {
                    const rankColors = ["#f59e0b", "#94a3b8", "#f97316"];
                    return (
                      <div key={cat} className={styles.top3CatCard}>
                        <div className={styles.top3CatRank} style={{ background: rankColors[i] }}>{i + 1}</div>
                        <div className={styles.top3CatInfo}>
                          <div className={styles.top3CatLabel}>LOẠI (CATEGORY)</div>
                          <div className={styles.top3CatName}>{cat}</div>
                        </div>
                        <div className={styles.top3CatCountWrap}>
                          <div className={styles.top3CatLabel}>SỐ LƯỢNG</div>
                          <div className={styles.top3CatCount}>{count}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Xu hướng tương tác theo ngày */}
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}><LineChartOutlined /> Xu hướng Tương tác</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendByDate} margin={{ top: 5, right: 24, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: "#718096", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#718096", fontSize: 11 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }} formatter={(val) => [val, "Số tương tác"]} />
                    <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ══ USERS TAB ══ */}
          {activeTab === "users" && (
            <div className={styles.tableWrap}>
              <h3 className={styles.chartTitle}><TeamOutlined /> Danh sách Người dùng</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th><th>User ID</th><th>Nguồn</th><th>Số câu hỏi</th><th>Lần cuối hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueUsers.map(({ user_id, count, lastSeen }, i) => (
                    <tr key={user_id}>
                      <td>{i + 1}</td>
                      <td><span className={styles.userId}>{user_id}</span></td>
                      <td>
                        <span className={`${styles.sourceBadge} ${detectSource(user_id) === "mess" ? styles.sourceMess : styles.sourceWeb}`}>
                          {detectSource(user_id) === "mess" ? "Messenger" : "Web"}
                        </span>
                      </td>
                      <td><span className={styles.badge}>{count}</span></td>
                      <td className={styles.dimText}>{new Date(lastSeen).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ══ LOGS TAB ══ */}
          {activeTab === "logs" && (
            <div className={styles.tableWrap}>
              <h3 className={styles.chartTitle}><MessageOutlined /> Chat Logs ({filtered.length} / {data.length})</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th><th>User ID</th><th>Câu hỏi</th><th>Loại</th><th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><span className={styles.userId}>{shortUser(item.user_id)}</span></td>
                      <td className={styles.questionCell} title={item.question}>
                        {item.question?.length > 60 ? item.question.slice(0, 60) + "…" : item.question}
                      </td>
                      <td>
                        <span
                          className={styles.typeBadge}
                          style={{
                            background: COLORS[questionTypes.findIndex((t) => t.name === classifyQuestion(item.question)) % COLORS.length] + "33",
                            color:      COLORS[questionTypes.findIndex((t) => t.name === classifyQuestion(item.question)) % COLORS.length],
                          }}
                        >
                          {classifyQuestion(item.question)}
                        </span>
                      </td>
                      <td className={styles.dimText}>{new Date(item.timestamp).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ══ HISTORY TAB ══ */}
          {activeTab === "history" && (
            <div className={styles.historyTabWrap}>
              {/* Left: danh sách users */}
              <div className={styles.historyLeft}>
                <div className={styles.historyPanelTitle}>
                  <TeamOutlined /> Người dùng ({uniqueUsers.length})
                </div>
                <div className={styles.historyUserList}>
                  {uniqueUsers.map(({ user_id, count, lastSeen }) => (
                    <div
                      key={user_id}
                      className={`${styles.historyUserItem} ${selectedHistoryUser === user_id ? styles.historyUserActive : ""}`}
                      onClick={() => setSelectedHistoryUser(user_id)}
                    >
                      <div className={styles.historyUserAvatar}>
                        {detectSource(user_id) === "mess" ? <MessageOutlined /> : <GlobalOutlined />}
                      </div>
                      <div className={styles.historyUserInfo}>
                        <div className={styles.historyUserId}>{shortUser(user_id)}</div>
                        <div className={styles.historyUserMeta}>{count} câu · {new Date(lastSeen).toLocaleDateString("vi-VN")}</div>
                      </div>
                      <span className={`${styles.sourceBadge} ${detectSource(user_id) === "mess" ? styles.sourceMess : styles.sourceWeb}`}>
                        {detectSource(user_id) === "mess" ? "Mess" : "Web"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: chat log */}
              <div className={styles.historyRight}>
                <div className={styles.historyPanelTitle}>
                  <MessageOutlined />
                  {selectedHistoryUser ? `Chat của ${shortUser(selectedHistoryUser)}` : "Chọn người dùng"}
                </div>
                {!selectedHistoryUser ? (
                  <div className={styles.historyEmpty}>← Chọn người dùng để xem lịch sử chat</div>
                ) : (
                  <div className={styles.chatLog}>
                    {selectedUserChats.map((item, i) => (
                      <div key={i} className={styles.chatEntry}>
                        <div className={styles.chatQ}>
                          <span className={styles.chatLabel}>Q</span>
                          <span className={styles.chatText}>{item.question}</span>
                          <span className={styles.chatTime}>{new Date(item.timestamp).toLocaleString("vi-VN")}</span>
                        </div>
                        {item.answer && (
                          <div className={styles.chatA}>
                            <span className={styles.chatLabelA}>A</span>
                            <span className={styles.chatText}>{item.answer}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;