companies = Company.create([
                                    { name: "Apple Inc.", size: 147000, country: "United States", industry: "Technology"},
                                    { name: "Toyota Motor Corporation", size: 370870, country: "Japan", industry: "Automotive"},
                                    { name: "Amazon.com Inc.", size: 1300000, country: "United States", industry: "E-commerce"},
                                    { name: "Royal Dutch Shell plc", size: 87000, country: "Netherlands", industry: "Oil and gas"},
                                    { name: "Samsung Electronics Co. Ltd.", size: 320671, country: "South Korea", industry: "Technology"},
                                    { name: "Volkswagen AG", size: 662610, country: "Germany", industry: "Automotive"},
                                    { name: "JPMorgan Chase & Co.", size: 252539, country: "United States", industry: "Financial services"},
                                    { name: "Unilever plc", size: 155000, country: "United Kingdom", industry: "Consumer goods"},
                                    { name: "Nestle SA", size: 308000, country: "Switzerland", industry: "Consumer goods"},
                                    { name: "Boeing Company", size: 141000, country: "United States", industry: "Aerospace and defense"},
                                ])

stocks = Stock.create([
                               { ticker: "AAPL", current_price: 121, min_price: 105.00, max_price: 145.09, company: companies[0] },
                               { ticker: "TM", current_price: 148.87, min_price: 120.41, max_price: 167.91, company: companies[1] },
                               { ticker: "AMZN", current_price: 3021, min_price: 2871.00, max_price: 3554.00, company: companies[2] },
                               { ticker: "RDS.A", current_price: 31.33, min_price: 25.63, max_price: 39.12, company: companies[3] },
                               { ticker: "SSNLF", current_price: 835, min_price: 490, max_price: 893, company: companies[4] },
                               { ticker: "VOW", current_price: 213.30, min_price: 123.88, max_price: 273.80, company: companies[5] },
                               { ticker: "JPM", current_price: 160.30, min_price: 101.38, max_price: 173.47, company: companies[6] },
                               { ticker: "ULVR", current_price: 4049.50, min_price: 3826.00, max_price: 4550.50, company: companies[7] },
                               { ticker: "NESN", current_price: 109.94, min_price: 96.46, max_price: 123.48, company: companies[8] },
                               { ticker: "BA", current_price: 252.61, min_price: 89.00, max_price: 278.57, company: companies[9] },
                           ])

users = User.create([
                             { first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password123", address: "123 Main St, Anytown, USA", birthday: 1-1-1990 },
                             { first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", password: "password456", address: "456 Oak Ave, Anytown, USA", birthday: 3-15-1995 },
                             { first_name: "Michael", last_name: "Johnson", email: "michael.johnson@example.com", password: "password789", address: "789 Elm Rd, Anytown, USA", birthday: 7-22-1985 },
                             { first_name: "Sarah", last_name: "Williams", email: "sarah.williams@example.com", password: "passwordABC", address: "321 Maple Dr, Anytown, USA", birthday: 11-30-2000 },
                             { first_name: "David", last_name: "Brown", email: "david.brown@example.com", password: "passwordDEF", address: "654 Pine Blvd, Anytown, USA", birthday: 10-05-1999 },
                             { first_name: "Jessica", last_name: "Taylor", email: "jessica.taylor@example.com", password: "passwordGHI", address: "987 Cedar St, Anytown, USA", birthday: 2002-11-03 },
                             { first_name: "Matthew", last_name: "Anderson", email: "matthew.anderson@example.com", password: "passwordJKL", address: "246 Birch Ln, Anytown, USA", birthday: 14-02-1982 },
                             { first_name: "Emily", last_name: "Jackson", email: "emily.jackson@example.com", password: "passwordMNO", address: "135 Walnut Ave, Anytown, USA", birthday: 24-04-1998 },
                             { first_name: "Christopher", last_name: "Thomas", email: "christopher.thomas@example.com", password: "passwordPQR", address: "864 Oakwood Rd, Anytown, USA", birthday: 8-12-1987 },
                             { first_name: "Amanda", last_name: "Wilson", email: "amanda.wilson@example.com", password: "passwordSTU", address: "369 Cedar Ave, Anytown, USA", birthday: 20-06-1993 }
                         ])

portfolios = Portfolio.create([
                                       { name: "Tech Stocks", industry: "Technology", public: true, active: true, user_id: 1 },
                                       { name: "Consumer Goods Stocks", industry: "Consumer Goods", public: true, active: true, user_id: 1 },
                                       { name: "Financial Stocks", industry: "Financial services", public: true, active: true, user_id: 2 } ,
                                       { name: "Financial Stocks", industry: "Financial services", public: true, active: true, user_id: 3 } ,
                                       { name: "Shops Stocks", industry: "E-commerce", public: true, active: true, user_id: 2 } ,
                                       { name: "Petrolier Stocks", industry: "Oil and gas", public: true, active: true, user_id: 5 } ,
                                       { name: "Automotive Stocks", industry: "Automotive", public: true, active: true, user_id: 6 } ,
                                       { name: "Automotive Stocks", industry: "Automotive", public: true, active: true, user_id: 7 } ,
                                       { name: "Tech Stocks", industry: "Technology", public: true, active: true, user_id: 8 } ,
                                       { name: "Consumer Goods Stocks", industry: "Consumer Goods", public: true, active: true, user_id: 8 }
                                   ])

PortfolioStock.create(portfolio_id: 1, stock_id: 1, price: 121, currency: "$")
PortfolioStock.create(portfolio_id: 1, stock_id: 3, price: 3021, currency: "$")
PortfolioStock.create(portfolio_id: 1, stock_id: 5, price: 835, currency: "$")

PortfolioStock.create(portfolio_id: 2, stock_id: 8, price: 3826.00, currency: "$")
PortfolioStock.create(portfolio_id: 2, stock_id: 9, price: 109.94, currency: "$")

PortfolioStock.create(portfolio_id: 3, stock_id: 7, price: 160.30, currency: "$")
PortfolioStock.create(portfolio_id: 4, stock_id: 7, price: 160.30, currency: "$")

PortfolioStock.create(portfolio_id: 5, stock_id: 3, price: 3021.22, currency: "$")

PortfolioStock.create(portfolio_id: 6, stock_id: 4, price: 25.63, currency: "$")

PortfolioStock.create(portfolio_id: 7, stock_id: 2, price: 120.41, currency: "$")
PortfolioStock.create(portfolio_id: 7, stock_id: 6, price: 120.41, currency: "$")

PortfolioStock.create(portfolio_id: 8, stock_id: 2, price: 130.41, currency: "$")

PortfolioStock.create(portfolio_id: 9, stock_id: 1, price: 121.21, currency: "$")

PortfolioStock.create(portfolio_id: 10, stock_id: 8, price: 3826.00, currency: "$")