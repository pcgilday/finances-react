import {_parseTransaction, _parseBudget} from './sheets'


test('[_parseTransaction] constructs object from sheet array', () => {
    const expense = _parseTransaction([
        '08/09/2017',
        'Amazon',
        '$21.44',
        'Supplies',
        'Checking',
        'kitchen and bathroom refills',
    ])
    expect(expense.date).toBe('2017-08-09')
    expect(expense.name).toBe('Amazon')
    expect(expense.amount).toBe(21.44)
    expect(expense.category).toBe('Supplies')
    expect(expense.account).toBe('Checking')
    expect(expense.notes).toBe('kitchen and bathroom refills')
})

test('[_parseBudget] constructs object from sheet array', () => {
    const expense = _parseBudget([
        'Amazon',
        '$100.50',
        'Supplies',
        'kitchen and bathroom refills',
    ])
    expect(expense.name).toBe('Amazon')
    expect(expense.amount).toBe(100.50)
    expect(expense.category).toBe('Supplies')
    expect(expense.notes).toBe('kitchen and bathroom refills')
})

