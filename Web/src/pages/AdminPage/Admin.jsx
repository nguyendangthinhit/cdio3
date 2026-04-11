import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import {
  RobotOutlined, DashboardOutlined, TeamOutlined, MessageOutlined, UserOutlined,
  RiseOutlined, AppstoreOutlined, SearchOutlined, SyncOutlined, LoadingOutlined, PieChartOutlined,BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import styles from "./Admin.module.scss";

// ── Phân loại câu hỏi theo từ khóa ─────────────────────────────────────────
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

// ── Màu sắc biểu đồ ─────────────────────────────────────────────────────────
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#a78bfa"];

// ── Rút gọn user_id ──────────────────────────────────────────────────────────
const shortUser = (id = "") =>
  id.length > 12 ? id.slice(0, 8) + "…" + id.slice(-4) : id;

// ── Format ngày ─────────────────────────────────────────────────────────────
const fmtDate = (ts) => {
  const d = new Date(ts);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

// ── Component Stat Card ──────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className={styles.statCard} style={{ borderTopColor: color }}>
    <div className={styles.statIcon} style={{ background: color + "22", color }}>
      {icon}
    </div>
    <div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const Admin = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const GITHUB_RAW_URL =
    "https://raw.githubusercontent.com/nguyendangthinhit/cdio3/main/QA.json";

  const fetchData = useCallback((isManual = false) => {
    if (isManual) setSyncing(true);
    // cache-busting bằng timestamp để luôn lấy dữ liệu mới nhất
    fetch(`${GITHUB_RAW_URL}?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((json) => {
        setData(json);
        setLastUpdated(new Date());
        setLoading(false);
        setSyncing(false);
      })
      .catch(() => {
        setLoading(false);
        setSyncing(false);
      });
  }, []);

  // Lần đầu load
  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-poll mỗi 30 giây
  useEffect(() => {
    const timer = setInterval(() => fetchData(), 30000);
    return () => clearInterval(timer);
  }, [fetchData]);

  // ── Dữ liệu đã lọc cho bảng ──────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      data.filter(
        (item) =>
          item.question?.toLowerCase().includes(search.toLowerCase()) ||
          item.user_id?.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  // ── Bi.đồ 1: Query theo user ─────────────────────────────────────────────
  const queryByUser = useMemo(() => {
    const map = {};
    data.forEach(({ user_id }) => {
      map[user_id] = (map[user_id] || 0) + 1;
    });
    return Object.entries(map).map(([id, count]) => ({
      name: shortUser(id),
      fullId: id,
      count,
    }));
  }, [data]);

  // ── Bi.đồ 2: Loại câu hỏi ────────────────────────────────────────────────
  const questionTypes = useMemo(() => {
    const map = {};
    data.forEach(({ question }) => {
      const cat = classifyQuestion(question);
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ── Bi.đồ 3: Xu hướng theo ngày ─────────────────────────────────────────
  const trend = useMemo(() => {
    const map = {};
    data.forEach(({ timestamp }) => {
      const key = fmtDate(timestamp);
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => {
        const [da, ma] = a[0].split("/").map(Number);
        const [db, mb] = b[0].split("/").map(Number);
        return mb !== ma ? ma - mb : da - db;
      })
      .map(([date, count]) => ({ date, count }));
  }, [data]);

  // ── Danh sách người dùng duy nhất ────────────────────────────────────────
  const uniqueUsers = useMemo(() => {
    const map = {};
    data.forEach(({ user_id, timestamp }) => {
      if (!map[user_id]) map[user_id] = { user_id, count: 0, lastSeen: timestamp };
      map[user_id].count += 1;
      if (new Date(timestamp) > new Date(map[user_id].lastSeen))
        map[user_id].lastSeen = timestamp;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [data]);

  const totalUsers = uniqueUsers.length;
  const avgQueriesPerUser = totalUsers
    ? (data.length / totalUsers).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
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
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              className={`${styles.navItem} ${activeTab === id ? styles.navActive : ""}`}
              onClick={() => setActiveTab(id)}
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
        {/* Header */}
        <header className={styles.topBar}>
          <div className={styles.pageTitle}>
            {activeTab === "dashboard" && <><DashboardOutlined /> Dashboard</>}
            {activeTab === "users"     && <><TeamOutlined />      Người Dùng</>}
            {activeTab === "logs"      && <><MessageOutlined />   Chat Logs</>}
          </div>
          <div className={styles.topBarRight}>
            {/* Trạng thái sync GitHub */}
            <div className={styles.syncStatus}>
              <span className={syncing ? styles.syncDotActive : styles.syncDot} />
              <span className={styles.syncText}>
                {syncing
                  ? "Đang đồng bộ..."
                  : lastUpdated
                  ? `Cập nhật ${lastUpdated.toLocaleTimeString("vi-VN")}`
                  : "Chưa đồng bộ"}
              </span>
              <button
                className={styles.syncBtn}
                onClick={() => fetchData(true)}
                disabled={syncing}
                title="Refresh ngay từ GitHub"
              >
                {syncing ? <LoadingOutlined spin /> : <SyncOutlined />}
              </button>
            </div>
            <div className={styles.searchWrap}>
              <SearchOutlined className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Tìm câu hỏi, user ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className={styles.body}>
          {/* ══════════════ DASHBOARD TAB ══════════════ */}
          {activeTab === "dashboard" && (
            <>
              {/* Stat cards */}
              <div className={styles.statRow}>
                <StatCard
                  icon={<MessageOutlined />}
                  label="Tổng câu hỏi"
                  value={data.length}
                  color="#6366f1"
                />
                <StatCard
                  icon={<UserOutlined />}
                  label="Người dùng"
                  value={totalUsers}
                  color="#10b981"
                />
                <StatCard
                  icon={<RiseOutlined />}
                  label="TB câu hỏi/user"
                  value={avgQueriesPerUser}
                  color="#f59e0b"
                />
                <StatCard
                  icon={<AppstoreOutlined />}
                  label="Loại câu hỏi"
                  value={questionTypes.length}
                  color="#ec4899"
                />
              </div>

              {/* Charts row 1 */}
              <div className={styles.chartGrid2}>
                {/* Chart 1: Số lượng query theo user */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}>
                    <BarChartOutlined /> Số lượng Query theo Người dùng
                  </h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={queryByUser} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#718096", fontSize: 11 }}
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis tick={{ fill: "#718096", fontSize: 11 }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }}
                        formatter={(val, _, props) => [val, props.payload.fullId]}
                      />
                      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 2: Loại câu hỏi */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartTitle}><PieChartOutlined /> Phân loại Câu hỏi</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={questionTypes}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={50}
                        paddingAngle={3}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {questionTypes.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Legend */}
                  <div className={styles.pieLegend}>
                    {questionTypes.map(({ name, value }, i) => (
                      <div key={i} className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ background: COLORS[i % COLORS.length] }}
                        />
                        <span>{name}</span>
                        <span className={styles.legendCount}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart 3: Xu hướng theo ngày */}
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}><LineChartOutlined /> Xu hướng Câu hỏi theo Ngày</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                    <XAxis dataKey="date" tick={{ fill: "#718096", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#718096", fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: 8, color: "#1a202c" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ══════════════ USERS TAB ══════════════ */}
          {activeTab === "users" && (
            <div className={styles.tableWrap}>
              <h3 className={styles.chartTitle}><TeamOutlined /> Danh sách Người dùng</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Số câu hỏi</th>
                    <th>Lần cuối hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueUsers.map(({ user_id, count, lastSeen }, i) => (
                    <tr key={user_id}>
                      <td>{i + 1}</td>
                      <td>
                        <span className={styles.userId}>{user_id}</span>
                      </td>
                      <td>
                        <span className={styles.badge}>{count}</span>
                      </td>
                      <td className={styles.dimText}>
                        {new Date(lastSeen).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ══════════════ LOGS TAB ══════════════ */}
          {activeTab === "logs" && (
            <div className={styles.tableWrap}>
              <h3 className={styles.chartTitle}>
                <MessageOutlined /> Chat Logs ({filtered.length} / {data.length})
              </h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Câu hỏi</th>
                    <th>Loại</th>
                    <th>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className={styles.userId}>{shortUser(item.user_id)}</span>
                      </td>
                      <td className={styles.questionCell} title={item.question}>
                        {item.question?.length > 60
                          ? item.question.slice(0, 60) + "…"
                          : item.question}
                      </td>
                      <td>
                        <span
                          className={styles.typeBadge}
                          style={{
                            background:
                              COLORS[
                                questionTypes.findIndex(
                                  (t) => t.name === classifyQuestion(item.question)
                                ) % COLORS.length
                              ] + "33",
                            color:
                              COLORS[
                                questionTypes.findIndex(
                                  (t) => t.name === classifyQuestion(item.question)
                                ) % COLORS.length
                              ],
                          }}
                        >
                          {classifyQuestion(item.question)}
                        </span>
                      </td>
                      <td className={styles.dimText}>
                        {new Date(item.timestamp).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;