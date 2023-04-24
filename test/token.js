const NoahToken = artifacts.require("NoahToken");

contract('token', (acounts) => {
    const [alice, bob] = acounts;

    it('balanceOf', async() => {
        const noahTokenInstance = await NoahToken.new('noah', 'NOAH', 0, '1024', {from: alice});

        const result = await noahTokenInstance.balanceOf(alice);
        console.log('result', result.valueOf().words[0]);
        assert.equal(result.valueOf().words[0], 1024, "1024 wasn't in alice");
    });

    if('transfer', async() => {
        const noahTokenInstance = await NoahToken.new('noah', 'NOAH', 0, '1024', {from: alice});

        await noahTokenInstance.transfer(bob, 1, {from: alice});

        let aliceBalanceResult = await noahTokenInstance.balanceOf(alice);
        assert.equal(aliceBalanceResult.valueOf().words[0], 1023, "1023 wasn't in alice");

        let bobBalanceResult = await noahTokenInstance.balanceOf(bob);
        assert.equal(bobBalanceResult.valueOf().words[0], 1, "1 wasn't in bob");

        await noahTokenInstance.transfer(alice, 1, {from: bob});
        aliceBalanceResult = await noahTokenInstance.balanceOf(alice);
        assert.equal(aliceBalanceResult.valueOf().word[0], 1024, "1024 wasn't in alice");

        bobBalanceResult = await noahTokenInstance.balanceOf(bob);
        assert.equal(bobBalanceResult.valueOf().word[0], 0, "0 wasn't in bob");


    });
});