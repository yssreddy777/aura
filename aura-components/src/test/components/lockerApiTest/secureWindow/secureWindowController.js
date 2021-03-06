({
    init: function(cmp, event, helper) {
        helper.utils.tester.initTests(helper.testName, helper.testPlan);

        var locker = $A.lockerService.create(null, "the secret is silence");
        var secureWindow = locker.globals;

        helper.utils.tester.testSystem(window);
        helper.utils.tester.testSecure(secureWindow, window);

        helper.utils.tester.showResults(cmp);
    }
})