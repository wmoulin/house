The output to sudo rfkill list shows that your network card is "soft-blocked".

This could happen when the wireless card has been signalled to switch-off via the kernel.

Try the following steps:

run in a terminal:

sudo rfkill unblock wifi; sudo rfkill unblock all

rerun sudo rfkill list to confirm that the card has been unblocked.

reboot

rerun sudo rfkill list again to confirm unblocking as been retained.

rerun sudo lshw -class network - you should now see that the kernel has recognised (or not) the wireless card.
