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
		} else if (object.right !== undefined) {
			print("hito direita");
			const rotation = {
				Rotation: ai.Rotation.add(new Vector3(0, 25, 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		} else if (object.left !== undefined) {
			print("hito esquerda");
			const rotation = {
				Rotation: ai.Rotation.sub(new Vector3(0, 25, 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		} else {
			print("hito ninguem");
			const rotation = {
				Rotation: ai.Rotation.sub(new Vector3(0, -25 * math.random(-1, 1), 0)),
			};
			const tween = TweenService.Create(ai, ti, rotation);
			tween.Play();
		}
		wait(2.01);
		cooldown = false;
	}
});

function createRaycast() {
	const front = Workspace.Raycast(ai.Position, ai.CFrame.LookVector.mul(10));
	const right = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(10, 0, -1)));
	const left = Workspace.Raycast(ai.Position, ai.CFrame.VectorToWorldSpace(new Vector3(-10, 0, -1)));
	return { front, right, left };
}
