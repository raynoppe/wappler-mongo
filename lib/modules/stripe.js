const Stripe = require('stripe');
const fs = requrie('fs-extra');
const config = require('../setup/config');
const instances = new Map();

function getProvider(name) {
    if (instances.has(name)) {
        return instances.get(name);
    }

    if (config.stripe[name]) {
        return setProvider(name, config.stripe[name]);
    }
    
    if (fs.existsSync(`app/modules/Stripe/${name}.json`)) {
        let action = fs.readJSONSync(`app/modules/Stripe/${name}.json`);
        return setProvider(name, action.options);
    }

    return new Error(`Couldn't find stripe provider "${name}".`);
}

function setProvider(name, options) {
    const stripe = Stripe(options.key);
    instances.set(name, stripe);
    return stripe;
}

exports.setup = function(options, name) {
    const key = this.parseRequired(options.key, 'string', 'stripe.setup: key is required.');
    if (!name) return new Error('stripe.setup: name is required.');
    setProvider(name, { key });
};

exports.retrieveBalance = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveBalance: provider is required.');
    const stripe = getProvider(provider);

    return stripe.balance.retrieve();
};

exports.retrieveBalanceTransaction = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveBalanceTransaction: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveBalanceTransaction: id is required.');
    const stripe = getProvider(provider);

    return stripe.balanceTransactions.retrieve(id);
};

exports.listBalanceTransactions = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listBalanceTransactions: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.balanceTransactions.list(options);
};

exports.createCharge = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createCharge: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.charges.create(options);
};

exports.retrieveCharge = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveCharge: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveCharge: id is required.');
    const stripe = getProvider(provider);

    return stripe.charges.retrieve(id);
};

exports.updateCharge = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateCharge: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateCharge: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.charges.update(id, options);
};

exports.captureCharge = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.captureCharge: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.captureCharge: id is required.');
    const stripe = getProvider(provider);

    return stripe.charges.capture(id);
};

exports.listCharges = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listCharges: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.charges.list(options);
};

exports.createCustomer = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createCustomer: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.create(options);
};

exports.retrieveCustomer = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveCustomer: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveCustomer: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.retrieve(id);
};

exports.updateCustomer = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateCustomer: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateCustomer: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.update(id, options);
};

exports.deleteCustomer = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.deleteCustomer: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.deleteCustomer: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.del(id);
};

exports.listCustomers = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listCustomers: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.list(options);
};

exports.retrieveDispute = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveDispute: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveDispute: id is required.');
    const stripe = getProvider(provider);

    return stripe.disputes.retrieve(id);
};

exports.updateCDispute = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateCDispute: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateCDispute: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.disputes.update(id, options);
};

exports.closeDispute = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.closeDispute: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.closeDispute: id is required.');
    const stripe = getProvider(provider);

    return stripe.disputes.close(id);
};

exports.listDisputes = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listDisputes: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.disputes.list(options);
};

exports.retrieveEvent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveEvent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveEvent: id is required.');
    const stripe = getProvider(provider);

    return stripe.events.retrieve(id);
};

exports.listEvents = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listEvents: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.events.list(options);
};

exports.createFile = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createFile: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.files.create(options);
};

exports.retrieveFile = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveFile: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveFile: id is required.');
    const stripe = getProvider(provider);

    return stripe.files.retrieve(id);
};

exports.listFiles = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listFiles: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.files.list(options);
};

exports.createFileLink = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createFileLink: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.fileLinks.create(options);
};

exports.retrieveFileLink = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveFileLink: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveFileLink: id is required.');
    const stripe = getProvider(provider);

    return stripe.fileLinks.retrieve(id);
};

exports.updateFileLink = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateFileLink: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateFileLink: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.fileLinks.update(id, options);
};

exports.listFileLinks = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listFileLinks: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.fileLinks.list(options);
};

exports.retrieveMandate = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveMandate: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveMandate: id is required.');
    const stripe = getProvider(provider);

    return stripe.mandates.retrieve(id);
};

exports.createPaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPaymentIntent: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.create(options);
};

exports.retrievePaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrievePaymentIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrievePaymentIntent: id is required.');
    const stripe = getProvider(provider);

    return stripe.paymentIntents.retrieve(id);
};

exports.updatePaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updatePaymentIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updatePaymentIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.update(id, options);
};

exports.confirmPaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.confirmPaymentIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.confirmPaymentIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.confirm(id, options);
};

exports.capturePaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.capturePaymentIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.capturePaymentIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.capture(id, options);
};

exports.cancelPaymentIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.cancelPaymentIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.cancelPaymentIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.cancel(id, options);
};

exports.listPaymentIntents = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listPaymentIntents: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentIntents.list(options);
};

exports.createSetupIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createSetupIntent: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupIntents.create(options);
};

exports.retrieveSetupIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveSetupIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveSetupIntent: id is required.');
    const stripe = getProvider(provider);

    return stripe.setupIntents.retrieve(id);
};

exports.updateSetupIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateSetupIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateSetupIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupIntents.update(id, options);
};

exports.confirmSetupIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.confirmSetupIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.confirmSetupIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupIntents.confirm(id, options);
};

exports.cancelSetupIntent = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.cancelSetupIntent: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.cancelSetupIntent: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupIntents.cancel(id, options);
};

exports.listSetupIntents = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listSetupIntents: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupIntents.list(options);
};

exports.listSetupAttempts = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listSetupAttempts: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.setupAttempts.list(options);
};

exports.createPayout = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPayout: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.payouts.create(options);
};

exports.retrievePayout = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrievePayout: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrievePayout: id is required.');
    const stripe = getProvider(provider);

    return stripe.payouts.retrieve(id);
};

exports.updatePayout = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updatePayout: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updatePayout: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.payouts.update(id, options);
};

exports.listPayouts = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listPayouts: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.payouts.list(options);
};

exports.cancelPayout = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.cancelPayout: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.cancelPayout: id is required.');
    const stripe = getProvider(provider);

    return stripe.payouts.cancel(id);
};

exports.createProduct = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createProduct: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.products.create(options);
};

exports.retrieveProduct = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveProduct: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveProduct: id is required.');
    const stripe = getProvider(provider);

    return stripe.products.retrieve(id);
};

exports.updateProduct = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateProduct: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateProduct: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.products.update(id, options);
};

exports.listProducts = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listProducts: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.products.list(options);
};

exports.deleteProduct = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.deleteProduct: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.deleteProduct: id is required.');
    const stripe = getProvider(provider);

    return stripe.products.del(id);
};

exports.createPrice = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPrice: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.prices.create(options);
};

exports.retrievePrice = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrievePrice: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrievePrice: id is required.');
    const stripe = getProvider(provider);

    return stripe.prices.retrieve(id);
};

exports.updatePrice = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updatePrice: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updatePrice: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.prices.update(id, options);
};

exports.listPrices = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listPrices: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.prices.list(options);
};

exports.createRefund = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createRefund: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.refunds.create(options);
};

exports.retrieveRefund = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveRefund: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveRefund: id is required.');
    const stripe = getProvider(provider);

    return stripe.refunds.retrieve(id);
};

exports.updateRefund = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateRefund: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateRefund: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.refunds.update(id, options);
};

exports.listRefunds = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listRefunds: provider is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.refunds.list(options);
};

exports.createCardToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createCardToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ card: options });
};

exports.createBankAccountToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createBankAccountToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ bank_account: options });
};

exports.createPIIToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPIIToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ pii: options });
};

exports.createAccountToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createAccountToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ account: options });
};

exports.createPersonToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPersonToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ person: options });
};

exports.createCVCUpdateToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createCVCUpdateToken: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.tokens.create({ cvc_update: options });
};

exports.retrieveToken = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveToken: provider is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveToken: id is required.');
    const stripe = getProvider(provider);

    return stripe.tokens.retrieve(id);
};

exports.createPaymentMethod = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createPaymentMethod: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentMethods.create(options);
};

exports.retrievePaymentMethod = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrievePaymentMethod: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrievePaymentMethod: id is required.');
    const stripe = getProvider(provider);

    return stripe.paymentMethods.retrieve(id);
};

exports.updatePaymentMethod = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updatePaymentMethod: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updatePaymentMethod: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentMethods.update(id, options);
};

exports.listPaymentMethods = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listPaymentMethods: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentMethods.list(options);
};

exports.attachPaymentMethod = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.attachPaymentMethod: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.attachPaymentMethod: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.paymentMethods.attach(id, options);
};

exports.detachPaymentMethod = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.detachPaymentMethod: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.detachPaymentMethod: id is required.');
    const stripe = getProvider(provider);

    return stripe.paymentMethods.detach(id);
};

exports.createBankAccount = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createBankAccount: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.createBankAccount: customer is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.createSource(customer, options);
};

exports.retrieveBankAccount = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveBankAccount: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.retrieveBankAccount: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveBankAccount: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.retrieveSource(customer, id);
    );
};

exports.updateBankAccount = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateBankAccount: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.updateBankAccount: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateBankAccount: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.updateSource(customer, id, options);
};

exports.verifyBankAccount = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.verifyBankAccount: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.verifyBankAccount: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.verifyBankAccount: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.verifySource(customer, id, options);
};

exports.deleteBankAccount = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.deleteBankAccount: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.deleteBankAccount: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.deleteBankAccount: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.deleteSource(customer, id);
};

exports.listBankAccounts = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listBankAccounts: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.listBankAccounts: customer is required.');
    const stripe = getProvider(provider);

    return stripe.customers.listSources(customer, { object: 'bank_account', ...options });
};

exports.createCard = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createCard: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.createCard: customer is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.createSource(customer, options);
};

exports.retrieveCard = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveCard: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.retrieveCard: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveCard: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.retrieveSource(customer, id);
    );
};

exports.updateCard = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateCard: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.updateCard: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateCard: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.updateSource(customer, id, options);
};

exports.deleteCard = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.deleteCard: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.deleteCard: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.deleteCard: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.deleteSource(customer, id);
};

exports.listCards = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listCards: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.listCards: customer is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.listSources(customer, { object: 'card', ...options });
};

exports.createSource = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.createSource: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.sources.create(options);
};

exports.retrieveSource = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveSource: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveSource: id is required.');
    const stripe = getProvider(provider);

    return stripe.sources.retrieve(id);
};

exports.updateSource = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.updateSource: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.updateSource: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.sources.update(id, options);
};

exports.attachSource = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.attachSource: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.attachSource: customer is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.customers.createSource(customer, options);
};

exports.detachSource = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.detachSource: provider is requried.');
    const customer = this.parseRequired(options.customer, 'string', 'stripe.detachSource: customer is required.');
    const id = this.parseRequired(options.id, 'string', 'stripe.detachSource: id is required.');
    const stripe = getProvider(provider);

    return stripe.customers.deleteSource(customer, id);
};

exports.createSession = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.attachSource: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.checkout.sessions.create(options);
};

exports.retrieveSession = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.retrieveSession: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.retrieveSession: id is required.');
    const stripe = getProvider(provider);

    return stripe.checkout.sessions.retrieve(id);
};

exports.listSessions = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listSessions: provider is requried.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.checkout.sessions.list(options);
};

exports.listSessionsLineItems = function(options) {
    const provider = this.parseRequired(options.provider, 'string', 'stripe.listSessionsLineItems: provider is requried.');
    const id = this.parseRequired(options.id, 'string', 'stripe.listSessionsLineItems: id is required.');
    const stripe = getProvider(provider);

    options = this.parse(options);

    return stripe.checkout.sessions.listLineItems(id, options);
};