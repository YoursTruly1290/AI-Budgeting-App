from datetime import datetime

class Budget:
    def __init__(self, initial_balance):
        self.balance = initial_balance
        self.expenses = []
        self.transaction_history = []

    def add_income(self, amount):
        self.balance += amount
        self.transaction_history.append(('Income', amount, datetime.now()))

    def add_expense(self, amount, description, category):
        self.balance -= amount
        self.expenses.append((amount, description, category))
        self.transaction_history.append(('Expense', amount, datetime.now(), description))

    def get_balance(self):
        return self.balance

    def get_expenses(self):
        return self.expenses

    def get_transaction_history(self):
        return self.transaction_history
