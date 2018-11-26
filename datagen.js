const faker = require('faker/locale/fr');
const util = require('util');
const fs = require ('fs');

function generateTransaction(){
    var transaction = {
        transactionType: faker.finance.transactionType(),
        transactionAmount: parseFloat(faker.finance.amount(0, 10000))
    }
    return transaction;
}

function generateTransactions(maxOperations){
    var transactions = [];
    numberOfOperations = Math.floor((Math.random() * maxOperations) + 1);
    for (k=0; k < numberOfOperations; k++){
        transactions[k] = generateTransaction();
    }
    return transactions;
}

function generateAccount() {
    var account = {
        accountName:faker.finance.accountName(),
        accountIban: faker.finance.iban(true),
        accountBic: faker.finance.bic(),
        accountBalance: parseFloat(faker.finance.amount(0, 250000)),
        transaction : generateTransactions(15)
    }

    return account;
}

function generateAccounts(maxAccounts){
    var accounts = [];
    numberOfAccounts = Math.floor((Math.random() * maxAccounts) + 1);
    for (j=0; j < numberOfAccounts; j++){
        accounts[j] = generateAccount();
    }
    return accounts;
}

function generatePerson() {
    var person = {
        firstName:  faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            coordinates: faker.address.latitude() + ", " + faker.address.longitude()
        },
        account: generateAccounts(3)
    }
    return person;
}

fs.unlink("./res/data.json", function(err){
    console.log(err);
});

for (i = 0 ; i < 500000; i++){
    var p = generatePerson();
    fs.appendFileSync("./res/data.json", JSON.stringify(p) + "\r\n");
}