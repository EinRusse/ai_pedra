import { RunService, TweenService, Workspace } from "@rbxts/services";

const ai = Workspace.WaitForChild("Rock") as Part;

const ti = new TweenInfo(2, Enum.EasingStyle.Quart, Enum.EasingDirection.In);

let cooldown = false;

RunService.Heartbeat.Connect(() => {
	if (cooldown === false) {
		cooldown = true;
		const object = createRaycast();
		if (object.front !== undefined) {
			print("hito meio");
			const position = {
				Position: ai.Position.add(ai.CFrame.LookVector.mul(1.5)),
			};
			const tween = TweenService.Create(ai, ti, position);
			tween.Play();
			tween.Completed.Connect(() => {
				if (object.front !== undefined) {
					const left = ai.WaitForChild("LeftEye") as Beam;
					const right = ai.WaitForChild("RightEye") as Beam;

					left.Enabled = true;
					right.Enabled = true;
					object.front.Instance.Destroy();
					wait(0.5);
					left.Enabled = false;
					right.Enabled = false;
				}
			});
		} else if (object.right !== undefined) {
			print("hito direita");
			const rotation = {
				CFrame: ai.CFrame.mul(CFrame.Angles(0, math.rad(-30), 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		} else if (object.left !== undefined) {
			print("hito esquerda");
			const rotation = {
				CFrame: ai.CFrame.mul(CFrame.Angles(0, math.rad(30), 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		} else {
			print("hito ninguem");
			const rotation = {
				CFrame: ai.CFrame.mul(CFrame.Angles(0, math.rad(30 * math.random(-1, 1)), 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		}
		wait(2.01);
		cooldown = false;
	}
});

function rightCast() {
	const upright = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(5, 0, -10)));
	if (upright !== undefined) {
		return upright;
	}
	const right = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(10, 0, -10)));
	if (right !== undefined) {
		return right;
	}
	const downright = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(15, 0, -10)));
	if (downright !== undefined) {
		return downright;
	}
}

function leftCast() {
	const upleft = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(-5, 0, -10)));
	if (upleft !== undefined) {
		return upleft;
	}
	const left = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(-10, 0, -10)));
	if (left !== undefined) {
		return left;
	}
	const downleft = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(-15, 0, -10)));
	if (downleft !== undefined) {
		return downleft;
	}
}

function createRaycast() {
	const front = Workspace.Raycast(ai.Position, ai.CFrame.LookVector.mul(10));
	const right = rightCast();
	const left = leftCast();
	return { front, right, left };
}
