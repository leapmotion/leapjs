describe('schema', function () {
    describe('fakes', function () {

        describe('pointable', function () {
            var finger, badFinger, badFingerDirection;
            var validator;

            before(function () {
                finger = fakeFinger();
                badFinger = fakeFinger();
                badFingerDirection = fakeFinger();
                badFingerDirection.stabilizedTipPosition.push(4);
                delete badFinger.id;
                validator = new ZSchema({ sync: true });
            });

            it('should pass validation', function () {
                var valid = validator.validate(finger, pointable_schema);
                assert.ok(valid, 'finger passes validation');
            });

            it('should not pass validation with missing id', function () {
                var valid = validator.validate(badFinger, pointable_schema);
                assert.ok(!valid, 'bad finger does not pass validation');
                var valid2 = validator.validate(badFingerDirection, pointable_schema);
                assert.ok(!valid2, 'bad direction does not pass validation');
            });

        });

        describe('hand', function () {

            var hand, bad_hand, tool_in_finger_hand, validator;

            before(function () {
                hand = fakeHand();
                if (!hand.tools.length) {
                    var tool = fakeTool();
                    hand.tools.push(tool);
                    hand.pointables.push(tool);
                }
                bad_hand = fakeHand();
                delete bad_hand.id;

                tool_in_finger_hand = fakeHand();
                var tool2 = fakeTool();
                tool_in_finger_hand.fingers.push(tool2);
                tool_in_finger_hand.pointables.push(tool2);

                validator = new ZSchema({ sync: true });
            });

            it('should pass validation', function () {
                var valid = validator.validate(hand, hand_schema);
                if (!valid) {
                    console.log('errors: %s', JSON.stringify(validator.getLastError(), true, 4));
                }
                assert.ok(valid, 'hand passes validation');
            });

            it('should not pass bad hand', function () {
                var valid = validator.validate(bad_hand, hand_schema);
                assert.ok(!valid, 'bad hand is not valid');
            })

            it('should not pass a hand with a tool in fingers', function () {
                var valid = validator.validate(tool_in_finger_hand, hand_schema);
                assert.ok(!valid, 'tool_in_finger_hand is not valid');
            })
        });

        describe('frame', function () {

            var frame, bad_frame, tool_in_finger_frame, validator;

            before(function () {
                frame = fakeFrame();

                bad_frame = fakeFrame();
                delete bad_frame.id;

                tool_in_finger_frame = fakeFrame();
                var tool2 = fakeTool();
                tool_in_finger_frame.fingers.push(tool2);
                tool_in_finger_frame.pointables.push(tool2);

                validator = new ZSchema({ sync: true });
            });

            it('should pass validation', function () {
                var valid = validator.validate(frame, frame_schema);
                if (!valid) {
                    console.log('errors: %s', JSON.stringify(validator.getLastError(), true, 4));
                }
                assert.ok(valid, 'frame passes validation');
            });

            it('should not pass bad frame', function () {
                var valid = validator.validate(bad_frame, frame_schema);
                assert.ok(!valid, 'bad frame is not valid');
            })

            it('should not pass a frame with a tool in fingers', function () {
                var valid = validator.validate(tool_in_finger_frame, frame_schema);
                assert.ok(!valid, 'tool_in_finger_frame is not valid');
            })
        })
    });

    describe.only('end to end with frame', function () {
        var frame, bad_frame, validator;

        before(function () {

            frame = new Leap.Frame(frame_captured);
            validator = new ZSchema({ sync: true });
            bad_frame = new Leap.Frame(frame_captured);
        });

        it('should validate an actual frame in end to end test', function () {
            var data = frame.toJSON();
            var valid = validator.validate(data, frame_schema);
            if (!valid) {
                console.log("data: %s", JSON.stringify(frame.toJSON()));
                console.log('errors: %s', JSON.stringify(validator.getLastError(), true, 4));
            }
            assert.ok(valid, 'frame should be valid');
        });

        it('should not validate an actual frame with bad data in end to end test', function () {

            bad_frame.tools.push(bad_frame.fingers.pop());

            var data = bad_frame.toJSON();
            var valid = validator.validate(data, frame_schema);
            if (!valid) {
               // console.log("data: %s", JSON.stringify(frame.toJSON()));
               // console.log('errors: %s', JSON.stringify(validator.getLastError(), true, 4));
            }
            assert.ok(!valid, 'bad_frame should not be valid');
        });
    })
});