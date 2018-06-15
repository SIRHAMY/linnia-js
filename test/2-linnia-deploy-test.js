import { assert } from 'chai';
import ethjsUtil from 'ethjs-util';
import Web3 from 'web3';
import Linnia from '../src';

describe('Linnia-deploy', () => {
  it('should deploy the contracts', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    const linnia = await Linnia.deploy(web3, null, {
      from: web3.eth.accounts[0],
      gas: 4000000,
    });
    const {
      hub, users, records, permissions,
    } = await linnia.getContractInstances();
    // deployed contracts shouldn't have zero address
    assert.lengthOf(ethjsUtil.stripHexPrefix(hub.address), 40);
    assert.lengthOf(ethjsUtil.stripHexPrefix(users.address), 40);
    assert.lengthOf(ethjsUtil.stripHexPrefix(records.address), 40);
    assert.lengthOf(ethjsUtil.stripHexPrefix(permissions.address), 40);
  });
});