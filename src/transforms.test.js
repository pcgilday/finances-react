import {getBudgetProgress, getCategoryTotals} from './transforms'

const getTestExpenses = (...expenses) => [
    ...expenses,
    {category: 'Shopping', amount: -10.54},
    {category: 'Utilities', amount: -40.78},
    {category: 'Home', amount: -400.00},
    {category: 'Restaurants', amount: -80.01},
    {category: 'Restaurants', amount: -15.01},
    {category: 'Restaurants', amount: 15.01},
    {category: 'Shopping', amount: -50.99},
    {category: 'Shopping', amount: -6.34},
    {category: 'Shopping', amount: 16.02},
    {category: 'Debt', amount: -100.00},
    {category: 'Debt', amount: -100.00},
]

const getTestBudgetItems = (...budgetItems) => [
    ...budgetItems,
    {category: 'Shopping', amount: -100.00},
    {category: 'Utilities', amount: -200.00},
    {category: 'Home', amount: -800.00},
    {category: 'Restaurants', amount: -300.00},
    {category: 'Income', amount: 1000.00},
    {category: 'Debt', amount: -100.00},
    {category: 'Debt', amount: -100.00},
]

test('[getCategoryTotals] totals items of the same category', () => {
    const categoryTotals = getCategoryTotals(getTestExpenses())
    expect(categoryTotals).toEqual({
        'Shopping': -51.85,
        'Utilities': -40.78,
        'Home': -400.00,
        'Restaurants': -80.01,
        'Debt': -200.00,
    })
})

test('[getBudgetProgress] creates budget progress items', () => {
    const budgetProgress = getBudgetProgress(
        getTestExpenses(),
        getTestBudgetItems(),
    )
    expect(budgetProgress).toEqual([
        {category: 'Shopping', amountPlanned: 100.00, amountSpent: 51.85},
        {category: 'Utilities', amountPlanned: 200.00, amountSpent: 40.78},
        {category: 'Home', amountPlanned: 800.00, amountSpent: 400.00},
        {category: 'Restaurants', amountPlanned: 300.00, amountSpent: 80.01},
        {category: 'Income', amountPlanned: 1000.00, amountSpent: 0},
        {category: 'Debt', amountPlanned: 200.00, amountSpent: 200.00},
    ])
})

