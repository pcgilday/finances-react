import {_getMonthlyFinances} from './connect-monthly-finances'


const transactions = [
    {
        date: '2017-09-08',
        name: 'Amazon',
        amount: -21.44,
        category: 'Supplies',
        account: 'Checking',
        notes: 'kitchen and bathroom refills',
    },
    {
        date: '2017-09-08',
        name: 'paycheck',
        amount: 1001,
        category: 'Income',
        account: 'Checking',
    },
    {
        date: '2017-08-08',
        name: 'Giant',
        amount: -48.44,
        category: 'Groceries',
        account: 'Checking',
    },
    {
        date: '2017-08-08',
        name: 'paycheck',
        amount: 1004,
        category: 'Income',
        account: 'Checking',
    },
    {
        date: '2017-07-08',
        name: 'Rent',
        amount: -800,
        category: 'Home',
        account: 'Checking',
    },
    {
        date: '2017-07-08',
        name: 'Gift',
        amount: -13.90,
        category: 'Home',
        account: 'Checking',
    },
]

// months are 0 indexed
const budget = {
    '6': [
        {
            name: 'Supplies',
            amount: -40,
            category: 'Supplies',
        },
        {
            name: 'Rent',
            amount: -800,
            category: 'Home',
        },
        {
            name: 'Groceries',
            amount: -500,
            category: 'Groceries',
        },
    ],
    '7': [
        {
            name: 'Supplies',
            amount: -40,
            category: 'Supplies',
        },
        {
            name: 'Rent',
            amount: -800,
            category: 'Home',
        },
        {
            name: 'Groceries',
            amount: -400,
            category: 'Groceries',
        },
    ],
    '8': [
        {
            name: 'Supplies',
            amount: -20,
            category: 'Supplies',
        },
        {
            name: 'Rent',
            amount: -800,
            category: 'Home',
        },
        {
            name: 'Groceries',
            amount: -400,
            category: 'Groceries',
        },
    ],
}

test('[_getMonthlyFinances] groups expenses and income by month', () => {
    const monthlyFinances = _getMonthlyFinances({transactions, budget})
    expect(monthlyFinances).toEqual([
        {
            month: 6,
            netIncome: -813.9,
            budget: [
                {
                    name: 'Supplies',
                    amount: -40,
                    category: 'Supplies',
                },
                {
                    name: 'Rent',
                    amount: -800,
                    category: 'Home',
                },
                {
                    name: 'Groceries',
                    amount: -500,
                    category: 'Groceries',
                },
            ],
            transactions: [
                {
                    date: '2017-07-08',
                    name: 'Rent',
                    amount: -800,
                    category: 'Home',
                    account: 'Checking',
                }, {
                    date: '2017-07-08',
                    name: 'Gift',
                    amount: -13.90,
                    category: 'Home',
                    account: 'Checking',
                }
            ],
        },
        {
            month: 7,
            netIncome: 955.56,
            budget: [
                {
                    name: 'Supplies',
                    amount: -40,
                    category: 'Supplies',
                },
                {
                    name: 'Rent',
                    amount: -800,
                    category: 'Home',
                },
                {
                    name: 'Groceries',
                    amount: -400,
                    category: 'Groceries',
                },
            ],
            transactions: [{
                date: '2017-08-08',
                name: 'Giant',
                amount: -48.44,
                category: 'Groceries',
                account: 'Checking',
            }, {
                date: '2017-08-08',
                name: 'paycheck',
                amount: 1004,
                category: 'Income',
                account: 'Checking',
            }],
        },
        {
            month: 8,
            netIncome: 979.56,
            budget: [
                {
                    name: 'Supplies',
                    amount: -20,
                    category: 'Supplies',
                },
                {
                    name: 'Rent',
                    amount: -800,
                    category: 'Home',
                },
                {
                    name: 'Groceries',
                    amount: -400,
                    category: 'Groceries',
                },
            ],
            transactions: [
                {
                    date: '2017-09-08',
                    name: 'Amazon',
                    amount: -21.44,
                    category: 'Supplies',
                    account: 'Checking',
                    notes: 'kitchen and bathroom refills',
                }, {
                    date: '2017-09-08',
                    name: 'paycheck',
                    amount: 1001,
                    category: 'Income',
                    account: 'Checking',
                }
            ],
        },
    ])
})

