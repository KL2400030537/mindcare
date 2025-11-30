import React, { Component } from 'react';
import './Login.css';
import { BASEURL, callApi } from './lib';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			signup: false,
			showPassword: false,
			showConfirmPassword: false,

			signupData: {
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				password: "",
				confirmPassword: ""
			},

			loginData: {
				email: "",
				password: ""
			},

			errData: {},
			loginErr: ""
		};
	}

	// ================= REAL-TIME VALIDATION =================

	validateField(name, value) {
		const errors = { ...this.state.errData };

		const nameRegex = /^[A-Za-z][A-Za-z\s]{1,}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[0-9]{10}$/;
		const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;

		switch (name) {
			case "firstName":
				if (!value.trim()) errors.firstName = "First Name is required";
				else if (!nameRegex.test(value))
					errors.firstName = "Only letters, must start with a letter";
				else delete errors.firstName;
				break;

			case "lastName":
				if (!value.trim()) errors.lastName = "Last Name is required";
				else if (!nameRegex.test(value))
					errors.lastName = "Only letters, must start with a letter";
				else delete errors.lastName;
				break;

			case "email":
				if (!value.trim()) errors.email = "Email is required";
				else if (!emailRegex.test(value))
					errors.email = "Invalid Email format";
				else delete errors.email;
				break;

			case "phone":
				if (!value.trim()) errors.phone = "Phone Number is required";
				else if (!phoneRegex.test(value))
					errors.phone = "Phone must be 10 digits";
				else delete errors.phone;
				break;

			case "password":
				if (!passwordRegex.test(value))
					errors.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number";
				else delete errors.password;
				break;

			case "confirmPassword":
				if (value !== this.state.signupData.password)
					errors.confirmPassword = "Passwords do not match";
				else delete errors.confirmPassword;
				break;

			default:
				break;
		}

		this.setState({ errData: errors });
	}

	handleSignUpInput(e) {
		const { name, value } = e.target;
		this.setState(
			{
				signupData: {
					...this.state.signupData,
					[name]: value
				}
			},
			() => this.validateField(name, value)
		);
	}

	validateSignupAll() {
		const fields = Object.keys(this.state.signupData);
		fields.forEach((field) =>
			this.validateField(field, this.state.signupData[field])
		);

		return Object.keys(this.state.errData).length === 0;
	}

	registerUser() {
		if (!this.validateSignupAll()) return;

		const { signupData } = this.state;
		const data = JSON.stringify({
			firstName: signupData.firstName,
			lastName: signupData.lastName,
			email: signupData.email,
			phone: signupData.phone,
			password: signupData.password
		});

		callApi("POST", BASEURL + "signup", data, this.signupResponse.bind(this));
	}

	signupResponse(res) {
		const rdata = JSON.parse(res);
		alert(rdata);

		this.setState({
			signupData: {
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				password: "",
				confirmPassword: ""
			},
			errData: {},
			signup: false
		});
	}

	// ================= LOGIN =================
	handleLoginInput(e) {
		this.setState({
			loginData: {
				...this.state.loginData,
				[e.target.name]: e.target.value
			}
		});
	}

	loginUser() {
		const { email, password } = this.state.loginData;

		if (!email || !password) {
			this.setState({ loginErr: "Email and Password are required" });
			return;
		}

		const data = JSON.stringify({ email, password });

		callApi("POST", BASEURL + "login", data, this.loginResponse.bind(this));
	}

	loginAsAdmin() {
		const { password } = this.state.loginData;
		
		
		const ADMIN_PASSWORD = "admin77admin";
		
		if (!password) {
			this.setState({ loginErr: "Password is required" });
			return;
		}

		if (password === ADMIN_PASSWORD) {
			localStorage.setItem("userName", "Admin");
			localStorage.setItem("userRole", "admin");
			window.location.href = "/admin-dashboard";
		} else {
			this.setState({ loginErr: "Invalid Admin Password!" });
		}
	}

	loginResponse(res) {
		const rdata = JSON.parse(res);
		if (rdata.redirect) {
			localStorage.setItem("userName", rdata.name);
			window.location.href = rdata.redirect;
		} else {
			alert(rdata);
		}
	}

	render() {
		const {
			signup,
			signupData,
			errData,
			loginData,
			loginErr,
			showPassword,
			showConfirmPassword
		} = this.state;

		return (
			<div className="login">
				{/* LEFT PANEL */}
				<div className="leftpanel">
					<h1>Welcome to MindCare 🌿</h1>
					<p>Your safe space to reflect and grow emotionally.</p>

					<img
						src="https://cdn-icons-png.flaticon.com/512/3210/3210045.png"
						alt="Rocket"
						className="rocket"
					/>

					<blockquote>
						“Your mental health is your superpower — nurture it.”
					</blockquote>
				</div>

				{/* RIGHT PANEL */}
				<div className="rightpanel">
					<div className="card">
						<h2>LOGIN</h2>
						<p>Access your MindCare Dashboard</p>

						<input
							type="text"
							placeholder="Email"
							name="email"
							value={loginData.email}
							onChange={(e) => this.handleLoginInput(e)}
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							value={loginData.password}
							onChange={(e) => this.handleLoginInput(e)}
						/>

						<button onClick={() => this.loginUser()}>Login</button>

						{loginErr && <p style={{ color: "red" }}>{loginErr}</p>}

						<p>
							Don't have an account?{" "}
							<span onClick={() => this.setState({ signup: true })}>
								Sign Up
							</span>
						</p>

						<div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
							<p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>👨‍💼 Admin Access</p>
							<button 
								onClick={() => this.loginAsAdmin()}
								style={{
									width: "100%",
									padding: "10px",
									background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
									color: "white",
									border: "none",
									borderRadius: "5px",
									cursor: "pointer",
									fontWeight: "bold"
								}}
							>
								Login as Admin
							</button>
						</div>
					</div>
				</div>

				{/* SIGNUP POPUP */}
				{signup && (
					<div className="overlay">
						<div className="signup">
							<button
								className="close"
								onClick={() => this.setState({ signup: false })}
							>
								X
							</button>

							<h2>Create an account</h2>

							{/* FIRST NAME */}
							<label>First Name *</label>
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={signupData.firstName}
								onChange={(e) => this.handleSignUpInput(e)}
								style={errData.firstName ? { border: "1px solid red" } : {}}
							/>
							{errData.firstName && (
								<p className="err">{errData.firstName}</p>
							)}

							{/* LAST NAME */}
							<label>Last Name *</label>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={signupData.lastName}
								onChange={(e) => this.handleSignUpInput(e)}
								style={errData.lastName ? { border: "1px solid red" } : {}}
							/>
							{errData.lastName && (
								<p className="err">{errData.lastName}</p>
							)}

							{/* EMAIL */}
							<label>Email *</label>
							<input
								type="text"
								name="email"
								placeholder="Email"
								value={signupData.email}
								onChange={(e) => this.handleSignUpInput(e)}
								style={errData.email ? { border: "1px solid red" } : {}}
							/>
							{errData.email && <p className="err">{errData.email}</p>}

							{/* PHONE */}
							<label>Phone Number *</label>
							<input
								type="text"
								name="phone"
								placeholder="Phone Number"
								value={signupData.phone}
								onChange={(e) => this.handleSignUpInput(e)}
								style={errData.phone ? { border: "1px solid red" } : {}}
							/>
							{errData.phone && <p className="err">{errData.phone}</p>}

							{/* PASSWORD */}
							<label>Password *</label>
							<div className="password-field">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Password"
									value={signupData.password}
									onChange={(e) => this.handleSignUpInput(e)}
									style={errData.password ? { border: "1px solid red" } : {}}
								/>
								<span
									className="toggle"
									onClick={() =>
										this.setState({ showPassword: !showPassword })
									}
								>
									{showPassword ? "🙈" : "👁"}
								</span>
							</div>
							{errData.password && (
								<p className="err">{errData.password}</p>
							)}

							{/* CONFIRM PASSWORD */}
							<label>Confirm Password *</label>
							<div className="password-field">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									placeholder="Confirm Password"
									value={signupData.confirmPassword}
									onChange={(e) => this.handleSignUpInput(e)}
									style={
										errData.confirmPassword
											? { border: "1px solid red" }
											: {}
									}
								/>
								<span
									className="toggle"
									onClick={() =>
										this.setState({
											showConfirmPassword: !showConfirmPassword
										})
									}
								>
									{showConfirmPassword ? "🙈" : "👁"}
								</span>
							</div>
							{errData.confirmPassword && (
								<p className="err">{errData.confirmPassword}</p>
							)}

							<button
								className="regButton"
								onClick={() => this.registerUser()}
							>
								Register
							</button>
						</div>
					</div>
				)}

				{/* FOOTER */}
				<footer className="site-footer">
					<p>
						This site is created for personal and educational use only.
						All assets belong to their respective owners.
					</p>
					<p>© 2025 MINDCARE</p>
				</footer>
			</div>
		);
	}
}

export default Login;