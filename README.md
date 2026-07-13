# 🏦 NatWest Online Banking Application

A fully functional static banking website built with vanilla JavaScript, HTML5, and CSS3. Users can manage deposits, withdrawals, and track transaction history with real-time currency calculations.

**🌐 Live Demo:** Coming soon (once deployed to GitHub Pages)

---

## ✨ Features

### 🔐 Authentication
- Secure login with username validation (minimum 3 characters)
- Password validation (minimum 4 characters)
- Username persistence across sessions using localStorage

### 💼 Dashboard
- Welcome message with logged-in username
- Dual-tab interface:
  - **Direct Branch Transfer (DBT)** - Access deposit and withdrawal services
  - **Transaction History** - View all past transactions with status badges

### 💵 Deposit Services
- **Cash Deposit** - Multiple denomination inputs (₹10, ₹20, ₹50, ₹100)
- **Cheque Deposit** - Flexible quantity and amount entry
- Real-time calculation with automatic word conversion (Indian numbering system)
- Branch code validation (6-digit format)
- Unique token generation for each transaction

### 💸 Withdrawal Services
- **Cash Withdrawal** - Direct amount entry with branch validation
- **Cheque Withdrawal** - Withdrawal via cheque with amount specification
- Real-time amount conversion to words
- Token generation system for transaction tracking

### 📊 Advanced Calculations
- **Currency Converter**: Converts rupees to Indian numbering system
  - Example: ₹370 = "Three Hundred Seventy Rupees Only"
  - Supports up to 100 trillion (Kharab)
  - Proper handling of Lakh (₹100,000) and Crore (₹10,000,000)

### 📝 Transaction Management
- Complete transaction history with timestamps
- Transaction status tracking (Completed/Cancelled)
- Cancel transaction capability with confirmation
- Local storage persistence for data survival across browser sessions

---

## 🚀 Getting Started

### Option 1: Local Development
1. Clone this repository
2. Open `index.html` in your web browser
3. Or run a local server:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Option 2: GitHub Pages (Recommended for Public Access)
See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed instructions to deploy this app for public access.

---

## 📁 Project Structure

```
natwest-banking-app/
├── index.html                 # Redirect to login page
├── src/
│   ├── index.html            # Login page (entry point)
│   ├── login.html            # Alternative login page
│   ├── dashboard.html        # Main dashboard (after login)
│   ├── dbt.html              # DBT options menu
│   ├── deposit.html          # Deposit method selection
│   ├── withdraw.html         # Withdrawal method selection
│   ├── cash-deposit.html     # Cash deposit form
│   ├── cheque-deposit.html   # Cheque deposit form
│   ├── cash-withdraw.html    # Cash withdrawal form
│   ├── cheque-withdraw.html  # Cheque withdrawal form
│   ├── cheque.html           # Cheque details reference
│   │
│   ├── css/
│   │   ├── styles.css        # Global styles & color variables
│   │   ├── login.css         # Login page layout
│   │   ├── dashboard.css     # Dashboard & tabs styling
│   │   ├── forms.css         # Form & currency grid styling
│   │   └── buttons.css       # Button variants & states
│   │
│   ├── js/
│   │   ├── app.js            # Utility functions (currency, token, etc.)
│   │   ├── login.js          # Login form handler
│   │   ├── tabs.js           # Dashboard tab switching
│   │   ├── forms.js          # Form calculations & submission
│   │   └── validation.js     # Input validation logic
│   │
│   └── assets/
│       └── logo.svg          # NatWest logo (₹ centered)
│
├── README.md                  # This file
├── GITHUB_SETUP.md           # GitHub deployment guide
└── .gitignore               # Git ignore rules
```

---

## 🎨 Design Details

### Color Scheme
- **Primary Blue**: #0066CC
- **Dark Blue**: #0052A3
- **Light Gray Background**: #f5f5f5
- **Text**: Dark gray (#333)
- **Success**: Green badges (#28a745)
- **Cancelled**: Gray badges (#6c757d)

### Responsive Design
- Mobile-first approach
- Flexbox and Grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

---

## 💾 Data Storage

All data is stored locally in browser's **localStorage**:
- **currentUsername**: Currently logged-in user
- **transactions**: JSON array of all transactions

Sample transaction structure:
```javascript
{
  id: "NW3028482024001",
  type: "Cash Deposit",
  date: "2024-10-30",
  amount: "370",
  status: "Completed",
  timestamp: 1730280482000
}
```

---

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser localStorage API
- **Icons**: Font Awesome 6.0.0 (via CDN)
- **No Dependencies**: Fully static, no npm packages required

---

## 🧪 Testing

### Test Credentials
- **Username**: `admin` (or any 3+ character username)
- **Password**: `1234` (or any 4+ character password)

### Test Scenarios
1. **Login Flow**: Enter username and password, verify dashboard loads
2. **Deposit**: Try cash deposit with various denomination combinations
3. **Word Conversion**: Verify ₹370 converts to "Three Hundred Seventy Rupees Only"
4. **Token Generation**: Check token format (NW + timestamp + random)
5. **Transaction History**: Verify transactions appear after save
6. **Cancel Transaction**: Test cancellation and status update

---

## 🛡️ Security Notes

⚠️ **This is a static application for demonstration purposes**

- **No Backend**: All data is stored locally in browser localStorage
- **No Encryption**: Passwords and data are not encrypted
- **For Demo Only**: Not for production banking use
- **Client-Side Only**: No server communication

For a real banking application, implement:
- Server-side authentication
- Database encryption
- HTTPS/TLS
- Two-factor authentication
- Audit logging

---

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via: `https://username.github.io/natwest-banking-app/`
4. See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed steps

### Other Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

---

## 🤝 Contributing

This is a demonstration project. Feel free to fork, modify, and learn from it!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

Created as a complete banking application demonstration project.

---

## ❓ FAQ

**Q: Can I use this for real banking?**
A: No, this is for educational/demonstration purposes only. It has no backend or security measures.

**Q: Will my data be saved?**
A: Yes, locally in your browser's localStorage. The data is lost if you clear browser cache.

**Q: Can I modify the design?**
A: Absolutely! All CSS is in `src/css/` folder and fully customizable.

**Q: How do I add more features?**
A: Add new HTML pages in `src/`, style with CSS, and add logic in JavaScript files.

---

**Made with ❤️ for learning banking application development**
Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are welcome!