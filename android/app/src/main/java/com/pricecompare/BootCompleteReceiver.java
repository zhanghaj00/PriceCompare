package com.pricecompare;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;

public class BootCompleteReceiver extends BroadcastReceiver {
private static final String TAG = "BootCompleteReceiver";
@Override
public void onReceive(Context context, Intent intent) {
    Intent service = new Intent(context, MyTaskService.class);
    context.startService(service);
    //HeadlessJsTaskService.acquireWakelockNow(context);
    Log.i(TAG, "Boot Complete. Starting MsgPushService...");
}

}