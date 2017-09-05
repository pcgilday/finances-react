import {getBudgetProgress, getCategoryTotals} from './transforms'

const getTestExpenses = (...expenses) => [
    ...expenses,
    {category: 'Shopping', amount: 10.54},
    {category: 'Utilities', amount: 240.78},
    {category: 'Home', amount: 304.22},
    {category: 'Food', amount: 4180.01},
    {category: 'Shopping', amount: 50.99},
    {category: 'Shopping', amount: 6.34},
]

const getTestBudgetItems = (...budgetItems) => [
    ...budgetItems,
    {category: 'Shopping', amount: 100.00},
    {category: 'Utilities', amount: 200.00},
    {category: 'Home', amount: 400.00},
    {category: 'Food', amount: 300.00},
]


test('[getBudgetProgress] creates budget progress items', () => {
    const budgetProgress = getBudgetProgress(getTestExpenses(), getTestBudgetItems())
    expect(budgetProgress).toEqual([
        {category: 'Shopping', amountPlanned: 100.00, amountSpent: 67.87},
        {category: 'Utilities', amountPlanned: 200.00, amountSpent: 240.78},
        {category: 'Home', amountPlanned: 400.00, amountSpent: 304.22},
        {category: 'Food', amountPlanned: 300.00, amountSpent: 4180.01},
    ])
})

test('[getCategoryTotals] totals items of the same category', () => {
    const categoryTotals = getCategoryTotals(getTestExpenses())
    expect(categoryTotals).toEqual({
        'Shopping': 67.87,
        'Utilities': 240.78,
        'Home': 304.22,
        'Food': 4180.01,
    })
})

test('[getCategoryTotals] budget totals items of the same category', () => {
    const categoryTotals = getCategoryTotals(getTestBudgetItems())
    expect(categoryTotals).toEqual({
        'Shopping': 100.00,
        'Utilities': 200.00,
        'Home': 400.00,
        'Food': 300.00,
    })
})


