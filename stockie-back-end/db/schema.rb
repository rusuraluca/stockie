# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_10_094538) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_settings", force: :cascade do |t|
    t.integer "per_page"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.text "name"
    t.bigint "size"
    t.text "country"
    t.text "industry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_companies_on_user_id"
  end

  create_table "portfolio_stocks", force: :cascade do |t|
    t.float "price"
    t.text "currency"
    t.bigint "portfolio_id", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["portfolio_id"], name: "index_portfolio_stocks_on_portfolio_id"
    t.index ["stock_id"], name: "index_portfolio_stocks_on_stock_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.text "name"
    t.text "industry"
    t.boolean "public", default: true
    t.boolean "active", default: true
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_portfolios_on_user_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.text "ticker"
    t.float "current_price"
    t.float "min_price"
    t.float "max_price"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["company_id"], name: "index_stocks_on_company_id"
    t.index ["user_id"], name: "index_stocks_on_user_id"
  end

  create_table "user_accounts", force: :cascade do |t|
    t.string "name"
    t.string "bio"
    t.date "birthday"
    t.string "gender"
    t.text "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_user_accounts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "password"
    t.string "confirmation_code"
    t.datetime "confirmation_code_expires_at"
    t.datetime "confirmed_at"
    t.string "password_digest"
    t.integer "role", default: 0
    t.bigint "user_id"
    t.index ["user_id"], name: "index_users_on_user_id"
  end

  add_foreign_key "companies", "users"
  add_foreign_key "portfolio_stocks", "portfolios"
  add_foreign_key "portfolio_stocks", "stocks"
  add_foreign_key "portfolios", "users"
  add_foreign_key "stocks", "companies"
  add_foreign_key "stocks", "users"
  add_foreign_key "user_accounts", "users"
  add_foreign_key "users", "users"
end
