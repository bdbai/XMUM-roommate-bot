#!/usr/bin/env node
'use strict';
const commander = require('commander');
const fetch = require('node-fetch');

const commands = commander
    .command('mockserver.js')
    .usage('[-gl <addr>] text_to_send')
    .description('Send a mock request to local Kobirt server.')
    .option('-g, --group', 'Send as group message')
    .option('-l, --location <addr>', 'Server address (default http://localhost:9001/)', 'http://localhost:5001/')
    .parse(process.argv);

const messageBody = {
    id:           10086,
    class:        'recv',
    time:         Math.round(new Date().getTime() / 1000),
    message:      commands.args.join(' '),
    sender:       '包布丁',
    user_id:      100810088,
    sender_uid:   347099920,
    receiver:     '膜K菊',
    receiver_id:  1008610086,
    receiver_uid: 2174034256,
    message_type: 'private',
    post_type:    'receive_message'
}
if (commands.group) {
    Object.assign(
        messageBody,
        {
            message_type: 'group',
            group:        'Kobirt Group',
            group_id:     10086100886,
            group_uid:    587790118,
        }
    )
}

fetch(commands.location, {
    method: 'post',
    body: JSON.stringify(messageBody),
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(res => console.log(res));