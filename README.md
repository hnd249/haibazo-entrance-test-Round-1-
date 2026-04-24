# HAIBAZO Entrance Test - Intern Software Engineer

## 🎮 Về dự án (About The Project)
Đây là bài test đầu vào cho vị trí Intern Software Engineer tại HAIBAZO JSC. Dự án là một mini web game được xây dựng bằng **React (Vite)**. Nhiệm vụ của người chơi là click vào các vòng tròn theo đúng thứ tự từ nhỏ đến lớn. 

## 🔗 Live Demo
- **Play here:** [DÁN_LINK_VERCEL_CỦA_BẠN_VÀO_ĐÂY]

## 🚀 Tính năng chính (Key Features)
- **Custom Points:** Người chơi tự do nhập số lượng vòng tròn mong muốn.
- **Auto Play Mode:** Tự động giải game (click mỗi 1 giây/lần) để test.
- **Smart Overlapping (z-index):** Xử lý thuật toán hiển thị khi các vòng tròn đè lên nhau (Stress test với 2000 điểm), đảm bảo các số nhỏ luôn nổi lên trên cùng để người chơi có thể click được.
- **Fading Effect:** Hiệu ứng vòng tròn đếm ngược 3 giây và mờ dần sau khi click đúng.
- **Real-time Timer:** Đồng hồ bấm giờ chuẩn xác, tự động dừng khi trò chơi kết thúc (Win/Game Over).

## 🛠️ Công nghệ sử dụng (Tech Stack)
- React.js (Vite)
- CSS3 thuần (Flexbox, Positioning)

## 💻 Hướng dẫn chạy dự án (Run Locally)

1. Clone repository này về máy:
   ```bash
   git clone https://github.com/hnd249/haibazo-entrance-test-Round-1-.git
   ```
2. Cài đặt các gói thư viện (Dependencies):
  ```bash
  npm install
  ```
3. Khởi động server (Development):
  ```bash
  npm run dev
  ```
