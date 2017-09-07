import {_getMonthlyFinances} from './connect-monthly-finances'


test('[_getMonthlyFinances] groups expenses and income by month', () => {
    const expenses = [
        {
            date: '2017-09-08',
            name: 'Amazon',
            amount: 21.44,
            category: 'Supplies',
            account: 'Checking',
            notes: 'kitchen and bathroom refills',
        },
        {
            date: '2017-08-08',
            name: 'Giant',
            amount: 48.44,
            category: 'Groceries',
            account: 'Checking',
        },
        {
            date: '2017-07-08',
            name: 'Rent',
            amount: 800,
            category: 'Home',
            account: 'Checking',
        },
    ]
    const income = [
        {
            date: '2017-09-08',
            name: 'paycheck',
            amount: 1001,
            category: 'Income',
            account: 'Checking',
        },
        {
            date: '2017-08-08',
            name: 'paycheck',
            amount: 1004,
            category: 'Home',
            account: 'Checking',
        },
        {
            date: '2017-07-08',
            name: 'Gift',
            amount: 13.90,
            category: 'Home',
            account: 'Checking',
        },
    ]

    const monthlyFinances = _getMonthlyFinances({income, expenses})
    expect(monthlyFinances).toEqual([
        {
            month: 6,
            budget: undefined,
            expenses: [{
                date: '2017-07-08',
                name: 'Rent',
                amount: 800,
                category: 'Home',
                account: 'Checking',
            }],
            income: [{
                date: '2017-07-08',
                name: 'Gift',
                amount: 13.90,
                category: 'Home',
                account: 'Checking',
            }]
        },
        {
            month: 7,
            budget: undefined,
            expenses: [{
                date: '2017-08-08',
                name: 'Giant',
                amount: 48.44,
                category: 'Groceries',
                account: 'Checking',
            }],
            income: [{
                date: '2017-08-08',
                name: 'paycheck',
                amount: 1004,
                category: 'Home',
                account: 'Checking',
            }]
        },
        {
            month: 8,
            budget: undefined,
            expenses: [{
                date: '2017-09-08',
                name: 'Amazon',
                amount: 21.44,
                category: 'Supplies',
                account: 'Checking',
                notes: 'kitchen and bathroom refills',
            }],
            income: [{
                date: '2017-09-08',
                name: 'paycheck',
                amount: 1001,
                category: 'Income',
                account: 'Checking',
            }]
        },
    ])
})

