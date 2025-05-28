/* eslint-disable @next/next/no-async-client-component */
'use client';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { addToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AddToCart = ({ item,cart }: { item: CartItem,cart:any }) => {
 
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addToCart(item);
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    }

    toast({
      variant: 'default',
      description: res.message,
      action: (
        <ToastAction
          className='bg-black text-white'
          altText='go to cart'
          onClick={() => router.push('/cart')}
        >
          Go to cart
        </ToastAction>
      ),
    });
  };
  const handleremoveItemfromCart=async()=>{
   const res= await removeItemFromCart(item)
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    }

    toast({
      variant: 'default',
      description: res.message,
      action: (
        <ToastAction
          className='bg-black text-white'
          altText='go to cart'
          onClick={() => router.push('/cart')}
        >
          Go to cart
        </ToastAction>
      ),
    });
  }
  const existingItem=cart?.items?.find(v=>v.productId===item.productId)
  if(existingItem){
   return <div >
   <Button type='button' variant='outline' onClick={handleremoveItemfromCart}>
      <Minus /> 
    </Button>
    <span className='px-2'>{existingItem.qty}</span>
    <Button type='button' variant='outline' onClick={handleAddToCart}>
      <Plus /> 
    </Button>
    </div>
  }
  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
