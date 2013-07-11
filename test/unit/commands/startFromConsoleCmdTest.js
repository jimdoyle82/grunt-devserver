var SandboxedModule = require('sandboxed-module')
  , Cli = require('../../../lib/controller/Cli.js')

describe('startFromConsoleCmdTest', function() {
    var startFromConsoleCmd, startServerSpy

    beforeEach(function() {
        mockDependenciesForUnitUnderTest()
    })

    function mockDependenciesForUnitUnderTest() {
        var UNIT_UNDER_TEST_PATH = '../../../lib/commands/startFromConsoleCmd'
          , options = { requires : { './startServerCmd.js' : createMockStartServer() } }
        startFromConsoleCmd = SandboxedModule.require(UNIT_UNDER_TEST_PATH, options)
    }

    function createMockStartServer() {
        startServerSpy = sinon.stub()
        return startServerSpy
    }

    describe('help', function() {
        var cli, showHelpSpy

        beforeEach(function() {
            cli = new Cli(['--help'])
            showHelpSpy = sinon.spy(Cli.prototype, 'showHelp')
            startFromConsoleCmd(cli)
        })

        afterEach(function() {
            showHelpSpy.restore()
        })

        it('shows help when help is requested', function() {
            expect(showHelpSpy.calledOnce).to.be.true
        })

        it('does not start the server when help is requested', function() {
            expect(startServerSpy.called).to.be.false
        })
    })

    it('starts the server', function() {
        var cli = new Cli()
        startFromConsoleCmd(cli)
        expect(startServerSpy.calledOnce).to.be.true
        expect(startServerSpy.firstCall.args[0]).to.be.equal(cli.options)
    })
})