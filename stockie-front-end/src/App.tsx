import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AppMenu} from "./components/AppMenu";
import {AppHome} from "./components/AppHome";
import {UserDetails} from "./components/users/UserDetails";
import {UserDelete} from "./components/users/UserDelete";
import {UserAdd} from "./components/users/UserAdd";
import {UserShowAll} from "./components/users/UserShowAll";
import {UserUpdate} from "./components/users/UserUpdate";

import {CompanyShowAll} from "./components/companies/CompanyShowAll";
import {CompanyDetails} from "./components/companies/CompanyDetails";
import {CompanyUpdate} from "./components/companies/CompanyUpdate";
import {CompanyAdd} from "./components/companies/CompanyAdd";
import {CompanyDelete} from "./components/companies/CompanyDelete";

import {PortfoliosStocksCount} from "./components/PortfoliosStocksCount";
import {StocksPortfoliosCount} from "./components/StocksPortfoliosCount";
import {StocksWithPriceGreaterThan} from "./components/StocksWithPriceGreaterThan";

import {StocksAdd} from "./components/stocks/StocksAdd";
import {StocksDetails} from "./components/stocks/StocksDetails";
import {StocksDelete} from "./components/stocks/StocksDelete";
import {StocksShowAll} from "./components/stocks/StocksShowAll";
import {StocksUpdate} from "./components/stocks/StocksUpdate";
import {PortfoliosShowAll} from "./components/portfolios/PortfoliosShowAll";
import {PortfolioDelete} from "./components/portfolios/PortfolioDelete";
import {PortfolioDetails} from "./components/portfolios/PortfolioDetails";
import {PortfolioAdd} from "./components/portfolios/PortfolioAdd";
import {PortfolioUpdate} from "./components/portfolios/PortfolioUpdate";


function App() {
  return (
      <React.Fragment>
          <Router>
              <AppMenu />
              <Routes>
                  <Route path="/" element={<AppHome />} />
                  <Route path="/users" element={<UserShowAll />}/>
                  <Route path="/users/add" element={<UserAdd />} />
                  <Route path="/users/:userId/details" element={<UserDetails />} />
                  <Route path="/users/:userId/edit" element={<UserUpdate />} />
                  <Route path="/users/:userId/delete" element={<UserDelete />} />

                  <Route path="/portfolios" element={<PortfoliosShowAll />}/>
                  <Route path="/portfolios/add" element={<PortfolioAdd />} />
                  <Route path="/portfolios/:portfolioId/edit" element={<PortfolioUpdate />} />
                  <Route path="/portfolios/:portfolioId/delete" element={<PortfolioDelete />} />
                  <Route path="/portfolios/:portfolioId/details" element={<PortfolioDetails />} />

                  <Route path="/stocks" element={<StocksShowAll />}/>
                  <Route path="/stocks/add" element={<StocksAdd />} />
                  <Route path="/stocks/:stockId/edit" element={<StocksUpdate />} />
                  <Route path="/stocks/:stockId/details" element={<StocksDetails />} />
                  <Route path="/stocks/:stockId/delete" element={<StocksDelete />} />

                  <Route path="/companies" element={<CompanyShowAll />}/>
                  <Route path="/companies/:companyId/details" element={<CompanyDetails />} />
                  <Route path="/companies/:companyId/edit" element={<CompanyUpdate />} />
                  <Route path="/companies/:companyId/delete" element={<CompanyDelete />} />
                  <Route path="/companies/add" element={<CompanyAdd />} />

                  <Route path="/portfolios-stocks-count" element={<PortfoliosStocksCount />} />
                  <Route path="/stocks-portfolios-count" element={<StocksPortfoliosCount />} />
                  <Route path="/stocks-list" element={<StocksWithPriceGreaterThan />} />
              </Routes>
          </Router>
      </React.Fragment>
  )
}

export default App
