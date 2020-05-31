class App {
    constructor() {
        this.users = new Users()
        this.container = document.getElementById("content-container")
        this.navBar = document.getElementById("nav-bar")
        this.errorHandler = new Errors()
        this.investments = new Investments()
    }

    // Render Forms
    renderLogin() {
        this.container.innerHTML = this.users.loginForm()
        const signUpLink = document.getElementById("signup-btn")
        const loginBtn = document.getElementById("login_btn")

        signUpLink.addEventListener("click", () => {
            return this.renderSignUp()
        })

        loginBtn.addEventListener("click", () => {
            this.users.loginRequest().then(() =>{
                if (this.hasErrors(this.users.currentUser)) {
                    this.renderLogin()
                    this.errorHandler.loginError()
                    this.users.resetCurrentUser()
                }
            })
        })
    } 

    renderSignUp() {
        this.container.innerHTML = this.users.signUpForm()
        const loginLink = document.getElementById("login-btn")
        const signUpBtn = document.getElementById("signup_btn")

        loginLink.addEventListener("click", () => {
            return this.renderLogin()
        })

        signUpBtn.addEventListener("click", () => {
            this.users.signUpRequest().then(() => {
            if (this.hasErrors(this.users.currentUser)) {
                this.renderSignUp()
                this.errorHandler.signUpError(this.users.currentUser)
                this.users.resetCurrentUser()
            }
        })
        })
    }

    hasErrors(user) {
        if (user.hasOwnProperty("error")) {
            return true
        }

        else {
            return false
        }
    }

    // Render Main Page
    // renderMainPage() {
        
    // }

    renderLoggedInNav() {
        const navBar = document.getElementById("nav-bar")
        navBar.innerHTML = `
        <h1>Investments Planner</h1>

        <p>Hello, ${this.currentUser.name}</p>
        <button id="logout_btn">Logout</button>
        `

        const logoutBtn = document.getElementById("logout_btn")
        logoutBtn.addEventListener("click", () => {
            this.logout()
        })
    }

    // renderChart() {

    // }

    // renderTable() {

    // }

    // renderNewInvestment() {

    // }

    // Get Investments
    getUserInvestments() {
        this.users.currentUser.investments.forEach(investment => {
            this.addInvestmentRow(investment)
        })
    }

    // Add Table Row
    addInvestmentRow(investment) {
        const investmentTbl = document.getElementById("invest_tbl")

        // Insert a new row
        let newRow = investmentTbl.insertRow(investmentTbl.rows.length)

        // Create Columns
        let nameCol = newRow.insertCell(0)
        let industryCol = newRow.insertCell(0)
        let typeCol = newRow.insertCell(0)
        let sharesCol = newRow.insertCell(0)

        // Create and append Text
        let nameTxt = document.createTextNode(`${investment.name}`)
        let industryTxt = document.createTextNode(`${investment.industry}`)
        let typeTxt = document.createTextNode(`${investment.invest_type}`)
        let sharesTxt = document.createTextNode(`${investment.shares}`)

        nameCol.appendChild(nameTxt)
        industryCol.appendChild(industryTxt)
        typeCol.appendChild(typeTxt)
        sharesCol.appendChild(sharesTxt)
    }

    // Logout
    logout() {
        this.users.resetCurrentUser()
        this.renderLogin()
    }
}