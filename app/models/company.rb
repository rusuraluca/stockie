class Company < ApplicationRecord
  has_one :stock, :class_name => 'Stock'
end
