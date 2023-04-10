require_relative '../lib/populator_fix.rb'

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
                             { first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password123", address: "123 Main St, Anytown, USA", birthday: "1990-1-19" },
                             { first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", password: "password456", address: "456 Oak Ave, Anytown, USA", birthday: "1995-3-15" },
                             { first_name: "Michael", last_name: "Johnson", email: "michael.johnson@example.com", password: "password789", address: "789 Elm Rd, Anytown, USA", birthday: "1985-7-22" },
                             { first_name: "Sarah", last_name: "Williams", email: "sarah.williams@example.com", password: "passwordABC", address: "321 Maple Dr, Anytown, USA", birthday: "2000-11-29" },
                             { first_name: "David", last_name: "Brown", email: "david.brown@example.com", password: "passwordDEF", address: "654 Pine Blvd, Anytown, USA", birthday: "1999-5-19" },
                             { first_name: "Jessica", last_name: "Taylor", email: "jessica.taylor@example.com", password: "passwordGHI", address: "987 Cedar St, Anytown, USA", birthday: "2002-11-03" },
                             { first_name: "Matthew", last_name: "Anderson", email: "matthew.anderson@example.com", password: "passwordJKL", address: "246 Birch Ln, Anytown, USA", birthday: "1982-1-14" },
                             { first_name: "Emily", last_name: "Jackson", email: "emily.jackson@example.com", password: "passwordMNO", address: "135 Walnut Ave, Anytown, USA", birthday: "1998-4-24" },
                             { first_name: "Christopher", last_name: "Thomas", email: "christopher.thomas@example.com", password: "passwordPQR", address: "864 Oakwood Rd, Anytown, USA", birthday: "1987-2-3" },
                             { first_name: "Amanda", last_name: "Wilson", email: "amanda.wilson@example.com", password: "passwordSTU", address: "369 Cedar Ave, Anytown, USA", birthday: "1993-2-20" }
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


companies = []
(1..1000).each {
  Company.populate 1000 do |c|
    c.name = Faker::Company.unique.name
    c.size = Faker::Number.within(range: 1..100000000)
    c.country = Faker::Address.country
    c.industry = Faker::IndustrySegments.industry
    companies << c
  end
}


stocks = []
sid = companies[0].id
eid = companies[companies.size-1].id
(1..1000).each {
  Stock.populate 1000 do |s|
    s.company_id = Faker::Number.unique.between(from: sid, to: eid)
    s.ticker = Faker::Alphanumeric.alpha(number: 5).upcase
    s.min_price = Faker::Number.between(from: 10.0, to: 1000.0).round(2)
    s.max_price = Faker::Number.between(from: s.min_price, to: 100000.0).round(2)
    s.current_price = Faker::Number.between(from: s.min_price, to: s.max_price).round(2)
    stocks << s
  end
}


users = []
(1..1000).each {
  User.populate 1000 do |u|
    u.first_name = Faker::Name.first_name
    u.last_name = Faker::Name.last_name
    u.email = Faker::Internet.free_email
    u.password = Faker::Internet.password
    u.address = Faker::Address.full_address
    u.birthday = Faker::Date.between(from: '1940-01-01', to: '2013-01-01')
    users << u
  end
}

portfolios = []
sid = users[0].id
eid = users[users.size-1].id
(1..1000).each {
  Portfolio.populate 1000 do |p|
    p.name = Faker::IndustrySegments.industry + ' Portfolio'
    p.industry = Faker::IndustrySegments.industry
    p.public = Faker::Boolean.boolean
    p.active = Faker::Boolean.boolean
    p.user_id = Faker::Number.between(from: sid, to: eid)
    #portfolios << p
  end
}


spid = portfolios[0].id
epid = portfolios[portfolios.size-1].id
ssid = stocks[0].id
esid = stocks[stocks.size-1].id
(1..10000).each {
  PortfolioStock.populate 1000 do |ps|
    ps.portfolio_id = Faker::Number.between(from: spid, to: epid)
    ps.stock_id = Faker::Number.between(from: ssid, to: esid)
    ps.price = Faker::Number.within(range: 10.0..100000.0).round(2)
    ps.currency = Faker::Currency.symbol
    while PortfolioStock.where(portfolio_id: ps.portfolio_id, stock_id: ps.stock_id).count > 1 do
      ps.portfolio_id = Faker::Number.between(from: spid, to: epid)
      ps.stock_id = Faker::Number.between(from: ssid, to: esid)
    end
  end
}
