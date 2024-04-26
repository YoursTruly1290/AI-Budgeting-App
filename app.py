# from flask import Flask, render_template, request, jsonify
# from budget_app import Budget

# app = Flask(__name__, static_url_path='/static')
budget = Budget(0)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    amount = float(request.form['amount'])
    description = request.form['description']
    category = request.form['category']
    
    if request.form['type'] == 'income':
        budget.add_income(amount)
    else:
        budget.add_expense(amount, description, category)
        
    balance = budget.get_balance()
    expenses = budget.get_expenses()
    
    return jsonify({'balance': balance, 'expenses': expenses})

@app.route('/get_balance')
def get_balance():
    return jsonify({'balance': budget.get_balance()})

@app.route('/get_expenses')
def get_expenses():
    expenses = budget.get_expenses()
    return jsonify({'expenses': expenses})

@app.route('/get_transaction_history')
def get_transaction_history():
    transaction_history = budget.get_transaction_history()
    return jsonify({'transaction_history': transaction_history})

if __name__ == '__main__':
    app.run(debug=True)
