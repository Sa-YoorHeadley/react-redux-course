import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  return (
    <Card className="w-auto">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center text-6xl">{count}</CardTitle>
        <CardDescription>
          <Input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(parseInt(e.target.value))}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
        <Button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Increment By Amount</Button>
      </CardContent>
    </Card>
  );
}
